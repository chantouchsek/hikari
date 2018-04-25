<?php

namespace App\Transformers;

class AlarmTransformer extends BaseTransformer
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
            'alarm_date' => $item->alarm_date,
            'alarm_time' => $item->alarm_time,
            'message' => $item->message,
            'users' => $item->users->count() ? $item->users : $item->positions,
            'recipients' => $item->recipients,
            'updated_at' => $item->updated_at->toDateString()
        ];
    }
}