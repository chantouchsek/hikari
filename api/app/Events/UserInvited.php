<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserInvited implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $channel;
    public $user;
    public $token;

    /**
     * Create a new event instance.
     *
     * @param $channel
     * @param $user
     * @param $token
     */
    public function __construct($channel, $user, $token)
    {
        $this->channel = $channel;
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'user.invited';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('App.Channel.'. $this->channel->id);
    }

    public function broadcastWith()
    {
        return [
            'channel' => $this->channel,
            'user' => $this->user,
            'token' => $this->token
        ];
    }
}
