<?php

namespace App\Transformers;

class TimeCardTransformer extends BaseTransformer
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
            'daytime' => (string)$item->daytime,
            'time_type' => (int)$item->time_type,
            'store' => isset($item->user) ? $item->user->store : null,
            'user' => $item->user,
            'user_id' => $item->user->id,
            'status' => (int)$item->status
        ];
    }
}