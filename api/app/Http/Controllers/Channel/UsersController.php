<?php

namespace App\Http\Controllers\Channel;

use App\Http\Requests\Channel\ShowRequest;
use App\Models\Channel;
use App\Transformers\UserTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * @var UserTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * The constructor for the controller.
     *
     * @param UserTransformer $transformer The transformer used to transform the model.
     */
    public function __construct(UserTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param  \App\Models\Channel $channel
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Channel $channel)
    {
        if (!$channel->is_public) {
            return $this->respondForbidden('You can not join this channel');
        }
        $user = $request->user('api')->id;
        if ($channel->users()->find($user)) {
            return $this->respondForbidden('You\'re already in the channel');
        }
        $channel->users()->attach($request->user('api')->id);
        $channel->save();
        return $this->respondCreated('The user has been added.');
    }

    /**
     * Display the specified resource.
     *
     * @param ShowRequest $request
     * @param Channel $channel
     *
     * @return JsonResponse
     */
    public function show(ShowRequest $request, Channel $channel): JsonResponse
    {
        $user = $channel->users;

        return $this->respond($user);
    }
}
