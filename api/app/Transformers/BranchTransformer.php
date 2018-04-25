<?php

namespace App\Transformers;

class BranchTransformer extends BaseTransformer
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
            'super_user_daily_report_template' => (string)$item->super_user_daily_report_template,
            'manager_daily_report_template' => (string)$item->manager_daily_report_template,
            'sub_manager_daily_report_template' => (string)$item->sub_manager_daily_report_template,
            'full_time_staff_daily_report_template' => (string)$item->full_time_staff_daily_report_template,
            'part_time_staff_daily_report_template' => (string)$item->part_time_staff_daily_report_template,
            'status' => (int)$item->status,
            'registration_date' => $item->created_at->toDateString(),
            'thumbnail_id' => $item->hasThumbnail() ? route('media.show', $item->thumbnail()->filename) : null
        ];
    }
}