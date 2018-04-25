<?php

namespace App\Transformers;

class UserTransformer extends BaseTransformer
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
            'staff_id' => (int)$item->staff_id,
            'registered' => $item->created_at->toDateString(),
            'store' => $item->store,
            'store_id' => $item->store ? $item->store->id : null,
            'hourly_wage' => $item->hourly_wage,
            'birth_date' => $item->birth_date->toDateString(),
            'time_card' => $item->item
        ];
    }
}