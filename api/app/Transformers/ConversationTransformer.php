<?php

namespace App\Transformers;

class ConversationTransformer extends BaseTransformer
{

    /**
     * Method used to transform an item.
     *
     * @param $item mixed The item to be transformed.
     *
     * @return array The transformed item.
     */
    public function transform($item): array
    {
        return [
            'id' => (int)$item->id,
            'message' => (string)$item->message,
            'users' => collect($item->users),
            'channel' => $item->channel
        ];
    }
}