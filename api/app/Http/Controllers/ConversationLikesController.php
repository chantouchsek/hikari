<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ConversationLikesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Conversation $conversation
     * @return Response
     */
    public function store(Request $request, Conversation $conversation)
    {
        return $conversation->like();
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  Conversation $conversation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Conversation $conversation)
    {
        return $conversation->dislike();
    }
}
