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
            'branch_id' => 1,
            'hourly_rate' => 100,
            'name' => 'Admin',
            'email' => 'test@admin.com'
        ]);
        factory(User::class, 500)->create();
    }
}
