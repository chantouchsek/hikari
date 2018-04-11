<?php
/**
 * Created by PhpStorm.
 * User: Chantouch Sek
 * Date: 2/23/2018
 * Time: 6:00 PM
 */

namespace App\Transformers;


class DepartmentTransformer extends BaseTransformer
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
            'description' => (string)$item->description,
            'status' => (boolean)$item->status
        ];
    }
}