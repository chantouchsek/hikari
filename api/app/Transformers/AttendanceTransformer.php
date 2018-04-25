<?php

namespace App\Transformers;

class AttendanceTransformer extends BaseTransformer
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
            'reported_at' => date('Y-m-d', strtotime($item->created_at)),
            'meal' => (int)$item->meal,
            'over_time' => (int)$item->over_time,
            'early_leave' => (int)$item->early_leave,
            'late' => (int)$item->late,
            'user' => $item->user,
            'branch' => $item->branch,
            'start_time' => $item->start_time->toDateString(),
            'start_timer' => $item->start_time->toTimeString(),
            'leave_time' => $item->leave_time->toDateString(),
            'leave_timer' => $item->leave_time->toTimeString(),
            'break_start' => $item->break_start->toDateString(),
            'break_start_time' => $item->break_start->toTimeString(),
            'break_finish' => $item->break_finish->toDateString(),
            'break_finish_time' => $item->break_finish->toTimeString(),
            'notes' => $item->notes
        ];
    }
}