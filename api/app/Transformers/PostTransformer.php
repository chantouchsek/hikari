<?php

namespace App\Transformers;

class PostTransformer extends BaseTransformer
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
            'user' => $item->user,
            'comments' => (string)$item->comments,
            'type' => (string)$item->type,
            'scheduled_at' => $item->scheduled_at->toDateTimeString(),
            'status' => (boolean)$item->status,
            'updated_at' => $item->updated_at->toDateTimeString()
        ];
    }
}