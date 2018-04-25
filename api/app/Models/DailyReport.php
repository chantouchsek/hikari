<?php

namespace App\Models;

use App\Concern\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyReport extends Model
{

    use Uploadable;

    protected $fillable = [
        'user_id',
        'sales',
        'total_guest',
        'guest_type',
        'cost',
        'quest_a',
        'quest_b',
        'quest_c',
        'comments',
        'unit_sale',
        'cross_profit',
        'branch_id',
        'date'
    ];

    protected $dates = [
        'date'
    ];

    protected $with = [
        'user'
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    /**
     * @return BelongsTo
     */
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class)->withDefault();
    }
}
