<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'user_id', 'type_attendance', 'meal', 'hourly_rate',
        'start_time', 'leave_time', 'break_start', 'break_finish',
        'late', 'early_leave', 'over_time', 'notes', 'branch_id'
    ];

    protected $dates = [
        'start_time', 'leave_time', 'break_start', 'break_finish'
    ];

    protected $with = [
        'user',
        'branch'
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }

    /**
     * @return BelongsTo
     */
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id')->withDefault();
    }
}
