<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimeCard extends Model
{
    protected $fillable = [
        'daytime', 'time_type', 'user_id', 'status'
    ];

    /**
     * @return¶ BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
