<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Post::class, function (Faker $faker) {
    return [
        'user_id' => mt_rand(1, 500),
        'type' => mt_rand(1, 5),
        'comments' => $faker->text,
        'scheduled_at' => $faker->dateTime,
        'status' => mt_rand(0, 1)
    ];
});
