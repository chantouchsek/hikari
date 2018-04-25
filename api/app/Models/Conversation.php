<?php

namespace App\Models;

use App\Concern\Likeable;
use App\Concern\Uploadable;
use App\Events\Conversation\Created;
use App\Events\Conversation\Deleted;
use App\Events\Conversation\Updated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Conversation extends Model
{
    use Uploadable, Likeable;

    protected $fillable = [
        'message',
        'user_id',
        'channel_id'
    ];

    protected $with = [
        'user', 'media', 'likes'
    ];

//    /**
//     * The event map for the model.
//     *
//     * Allows for object-based events for native Eloquent events.
//     *
//     * @var array The event mapping.
//     */
//    protected $dispatchesEvents = [
//        'created' => Created::class,
//        'updated' => Updated::class,
//        'deleted' => Deleted::class,
//    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }
}
