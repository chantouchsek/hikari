<?php

namespace App\Transformers;


class ChatMessageTransformer extends BaseTransformer
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
            'user' => $item->user,
            'thumbnail' => $item->hasThumbnail() ? route('media.show', $item->thumbnail()->filename) : null,
            'sent_at' => $item->created_at->toDateString()
        ];
    }
}