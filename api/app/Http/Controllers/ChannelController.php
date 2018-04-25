<?php

namespace App\Http\Controllers;

use App\Events\UserInvited;
use App\Http\Requests\Channel\StoreRequest;
use App\Http\Requests\Channel\UpdateRequest;
use App\Mail\InviteCreated;
use App\Models\Channel;
use App\Models\Invite;
use App\Transformers\ChannelTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;

class ChannelController extends Controller
{
    /**
     * @var ChannelTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * UsersController constructor.
     * @param ChannelTransformer $transformer The transformer used to transform the model
     */
    public function __construct(ChannelTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        if (Input::get('limit')) {
            $this->setPagination(Input::get('limit'));
        }

        $pagination = Channel::paginate($this->getPagination());

        $data = $this->transformer->transformCollection(collect($pagination->items()));

        return $this->respondWithPagination($pagination, [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreRequest $request)
    {
        $user = $request->user('api')->id;
        $channel = new Channel($request->all());
        $channel->user_id = $user;
        $users = collect(request('users'));
        $users->push($user);
        $channel->save();

        $channel->users()->attach($users);
        $pivot = $channel->users()
            ->wherePivot('user_id', '=', $user)
            ->first()->pivot;
        $pivot->is_joined = 1;
        $pivot->save();
        $this->sendUserNotification($channel);

        return $this->respondCreated('The channel has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Channel $channel
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Channel $channel)
    {
        $id = request()->user()->id;
        $user = $channel->users()->find($id);
        $user_joined = $channel->users()
            ->where('channel_id', $channel->id)
            ->where('user_id', $id)
            ->where('is_joined', '=', 0)->first();
        if (empty($user) && $user_joined) {
            return $this->respondForbidden('You dont have to access this channel');
        }
        return $this->respond($this->transformer->transform($channel));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest $request
     * @param  \App\Models\Channel $channel
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, Channel $channel)
    {
        if ($channel->user_id !== $request->user()->id) {
            return $this->respondForbidden('You are not allowed to access here.');
        }
        $channel->fill($request->all());
        $users = collect(request('users'));
        $users->push($request->user('api')->id);

        $channel->users()->sync($users);
        $channel->save();
        $this->sendUserNotification($channel);
        return $this->respondCreated('The channel has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Channel $channel
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Channel $channel)
    {
        $channel->delete();
        return $this->respondWithSuccess('The channel and related users has been removed.');
    }


    /**
     * @param Channel $channel
     */
    public function sendUserNotification(Channel $channel)
    {
        $all_users = $channel->users()
            ->where('channel_id', $channel->id)
            ->where('is_joined', '=', 0);
        if ($all_users->exists()) {
            foreach ($all_users->get() as $user) {
                $invited = Invite::where('user_id', '=', $user->id)
                    ->where('channel_id', $channel->id)->first();
                $user_joined = $channel->users()
                    ->where('channel_id', $channel->id)
                    ->where('user_id', $user->id)
                    ->where('is_joined', '=', 1)
                    ->count();
                do {
                    $token = str_random();
                } while (Invite::where('token', $token)->first());
                $invite = new Invite([
                    'email' => $user->email,
                    'token' => $token,
                    'user_id' => $user->id,
                    'channel_id' => $channel->id
                ]);
                if (!$invited && !$user_joined) {
                    broadcast(new UserInvited($channel, $user, $token))->toOthers();
                    // $user->notify(new UserInvitedNotification($channel, $user));
                    $invite->save();
                }
                if ($user->email && !$invited && !$user_joined) {
                    Mail::to($user->email)->send(new InviteCreated($invite, $channel));
                }
            }
        }
    }
}
