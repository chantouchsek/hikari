<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Department::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->sentence,
        'status' => mt_rand(0,1)
    ];
});
