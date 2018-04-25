<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Position::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->text,
        'status' => 1
    ];
});
