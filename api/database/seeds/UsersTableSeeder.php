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
      'email' => 'admin@test.com',
      'password' => bcrypt('1')
    ]);
    factory(User::class, 500)->create();
  }
}
