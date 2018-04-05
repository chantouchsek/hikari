<?php

namespace App\Models;

use App\Events\Store\Created;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
  protected $fillable = [
    'name', 'address', 'status'
  ];

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function staffs()
  {
    return $this->hasMany(User::class);
  }

  /**
   * The event map for the model.
   *
   * Allows for object-based events for native Eloquent events.
   *
   * @var array The event mapping.
   */
  protected $events = [
    'created' => Created::class,
    //'updated' => Updated::class,
    //'deleted' => Deleted::class,
  ];
}
