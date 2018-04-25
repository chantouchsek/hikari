<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\TimeCard::class, function (Faker $faker) {
    $type = [
        1 => '出勤',
        2 => '退勤',
        3 => '休憩開始',
        4 => '休憩終了'
    ];
    return [
        'time_type' => random_int(1, 4),
        'user_id' => 1,
        'daytime' => mt_rand(0, 1)
    ];
});
