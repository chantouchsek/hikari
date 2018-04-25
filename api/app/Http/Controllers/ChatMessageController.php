<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Transformers\ChatMessageTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ChatMessageController extends Controller
{
    /**
     * @var ChatMessageTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * UsersController constructor.
     * @param ChatMessageTransformer $transformer The transformer used to transform the model
     */
    public function __construct(ChatMessageTransformer $transformer)
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

        $pagination = ChatMessage::with('user:id,name')->paginate($this->getPagination());

        $users = $this->transformer->transformCollection(collect($pagination->items()));

        return $this->respondWithPagination($pagination, [
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ChatMessage $chatMessage
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\ChatMessage $chatMessage
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ChatMessage $chatMessage
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ChatMessage $chatMessage)
    {
        //
    }
}
