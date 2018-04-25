<?php

namespace App\Transformers;

class DailyReportTransformer extends BaseTransformer
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
            'user_id' => (int)$item->user_id,
            'branch_id' => (int)$item->branch_id,
            'date' => $item->date->toDateString(),
            'sales' => (float)$item->sales,
            'cost' => (float)$item->cost,
            'total_guest' => (int)$item->total_guest,
            'guest_type' => (int)$item->guest_type,
            'unit_sale' => $item->unit_sale,
            'cross_profit' => $item->cross_profit,
            'quest_a' => (string)$item->quest_a,
            'quest_b' => (string)$item->quest_b,
            'quest_c' => (string)$item->quest_c,
            'comments' => (string)$item->comments,
            'user' => $item->user,
            'branch' => $item->branch
        ];
    }
}