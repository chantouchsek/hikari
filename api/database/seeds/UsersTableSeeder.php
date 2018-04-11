<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    factory(User::class)->create([
      'staff_id' => '1',
      'password' => bcrypt('1'),
      'store_id' => 1,
      'hourly_wage' => 100
    ]);
    factory(User::class, 500)->create();
  }
}
