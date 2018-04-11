<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Quest::class, function (Faker $faker) {
  return [
    'name' => $faker->name,
    'quest_type' => mt_rand(0, 4),
    'user_id' => mt_rand(1, 5000),
    'date_term' => $faker->date(),
    'status' => mt_rand(0, 1)
  ];
});
