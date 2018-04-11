<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quest extends Model
{
    protected $fillable = [
        'name', 'quest_type', 'user_id', 'date_term', 'status'
    ];

    protected $dates = [
        'date_term'
    ];

    protected $with = [
        'user'
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
