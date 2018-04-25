<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Conversation::class, function (Faker $faker) {
    return [
        'message' => $faker->text,
        'user_id' => mt_rand(1, 10),
        'channel_id' => 1
    ];
});
