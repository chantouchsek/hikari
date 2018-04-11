<?php

namespace App\Models;

use App\Concern\Uploadable;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{

    use Uploadable;

    protected $fillable = [
        'name', 'super_user_daily_report_template', 'manager_daily_report_template', 'sub_manager_daily_report_template',
        'full_time_staff_daily_report_template', 'part_time_staff_daily_report_template', 'status', 'thumbnail_id'
    ];
}
