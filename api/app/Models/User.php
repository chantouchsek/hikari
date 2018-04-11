<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

/**
 * @property \Carbon\Carbon $created_at
 * @property int $id
 * @property \Carbon\Carbon $updated_at
 */
class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'birth_date', 'store_id', 'hourly_wage', 'staff_id'
    ];

    protected $dates = [
        'birth_date'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Find the user identified by the given $identifier.
     *
     * @param $identifier email|id
     * @return mixed
     */
    public function findForPassport($identifier)
    {
        return $this->orWhere('id', $identifier)->orWhere('name', $identifier)->first();
    }

    /**
     * @return BelongsTo
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * @return HasMany
     */
    public function timeCard(): HasMany
    {
        return $this->hasMany(TimeCard::class);
    }

    /**
     * @return HasMany
     */
    public function quests(): HasMany
    {
        return $this->hasMany(Quest::class);
    }

    /**
     * @return HasMany
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}
