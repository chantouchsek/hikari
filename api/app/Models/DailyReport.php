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
        'number_customers',
        'customer_type',
        'cost',
        'quest_a',
        'quest_b',
        'notes',
        'total_price',
        'rough_interest',
        'price_per_customer',
        'thumbnail_id',
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
