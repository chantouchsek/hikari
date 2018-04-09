<?php

namespace App\Transformers;

class QuestTransformer extends BaseTransformer
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
      'date_term' => $item->date_term->toDateString(),
      'quest_type' => (int)$item->quest_type,
      'status' => (int)$item->status
    ];
  }
}