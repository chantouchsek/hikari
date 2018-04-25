<?php

namespace App\Transformers;

class ChannelTransformer extends BaseTransformer
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
            'name' => (string)$item->name,
            'is_public' => (boolean)$item->is_public,
            'users' => collect($item->users),
            'group' => $item->group,
            'conversations' => collect($item->conversations)
        ];
    }
}