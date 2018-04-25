<?php

namespace App\Http\Controllers;

use App\Events\Conversation\Created;
use App\Events\Conversation\MessageSent;
use App\Http\Requests\Conversation\StoreRequest;
use App\Models\Conversation;
use App\Models\User;
use App\Transformers\ConversationTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ConversationController extends Controller
{
    /**
     * @var ConversationTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * UsersController constructor.
     * @param ConversationTransformer $transformer The transformer used to transform the model
     */
    public function __construct(ConversationTransformer $transformer)
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

        $pagination = Conversation::paginate($this->getPagination());

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
        ini_set('memory_limit', '-1');
        ini_set('post_max_size', '-1');
        ini_set('upload_max_filesize', '-1');
        $conversation = new Conversation($request->all());
        $conversation->user_id = request()->user()->id;
        $conversation->save();
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $conversation->storeAndSetAttachFiles($file);
            }
        }
        $user = User::find($request->user()->id);
        $conversation->load('user');
        broadcast(new MessageSent($user, $conversation))->toOthers();
        return $this->respondCreated('The message has been created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Conversation $conversation
     * @return \Illuminate\Http\Response
     */
    public function show(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Conversation $conversation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Conversation $conversation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
