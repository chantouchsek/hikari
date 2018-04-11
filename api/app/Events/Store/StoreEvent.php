<?php

namespace App\Events\Store;

use App\Models\Store;
use App\Transformers\StoreTransformer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Events\BaseEvent as Event;

abstract class StoreEvent extends Event
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   *
   * @param Store $store The store that has been updated.
   */
  public function __construct(Store $store)
  {
    $this->model = $store;
    $this->transformer = new StoreTransformer();
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return ['store'];
  }
}
