<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    protected $fillable = [
        'token', 'email', 'channel_id', 'user_id'
    ];
}
