<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Branch::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'status' => mt_rand(0, 1),
        'super_user_daily_report_template' => $faker->text,
        'manager_daily_report_template' => $faker->text,
        'sub_manager_daily_report_template' => $faker->text,
        'full_time_staff_daily_report_template' => $faker->text,
        'part_time_staff_daily_report_template' => $faker->text,
        'media_id' => mt_rand(1, 9)
    ];
});
