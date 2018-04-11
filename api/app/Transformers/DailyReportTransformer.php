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
      'sales' => (float)$item->sales,
      'number_customers' => (int)$item->number_customers,
      'customer_type' => (int)$item->customer_type,
      'cost' => (float)$item->cost,
      'quest_a' => (string)$item->quest_a,
      'quest_b' => (string)$item->quest_b,
      'notes' => (string)$item->notes,
      'total_price' => $item->total_price,
      'price_per_customer' => $item->price_per_customer,
      'rough_interest' => $item->rough_interest,
      'date' => $item->date->toDateString(),
      'user' => $item->user,
      'branch' => $item->branch
    ];
  }
}