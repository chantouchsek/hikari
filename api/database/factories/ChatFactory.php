<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\ChatMessage::class, function (Faker $faker) {
    return [
        'user_id' => mt_rand(1, 500),
        'message' => $faker->text,
        'is_pin' => mt_rand(0, 1)
    ];
});
