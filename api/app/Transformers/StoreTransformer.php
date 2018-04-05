<?php

namespace App\Transformers;


class StoreTransformer extends BaseTransformer
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
      'address' => (string)$item->address,
      'status' => (boolean)$item->status,
      'registered' => $item->created_at
    ];
  }
}