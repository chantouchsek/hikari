<?php

namespace App\Events\Conversation;

use App\Events\BaseEvent as Event;
use App\Models\Conversation;
use App\Transformers\ConversationTransformer;


abstract class ConversationEvent extends Event
{
    /**
     * Create a new event instance.
     *
     * @param Conversation $conversation The conversation that has been updated.
     */
    public function __construct(Conversation $conversation)
    {
        $this->model = $conversation;
        $this->transformer = new ConversationTransformer();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Conversation|array
     */
    public function broadcastOn()
    {
        return ['conversation'];
    }
}