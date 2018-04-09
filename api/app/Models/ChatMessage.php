<?php

namespace App\Models;

use App\Concern\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    use Uploadable;

    protected $fillable = [
        'user_id', 'is_pin', 'message', 'thumbnail_id'
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }
}
