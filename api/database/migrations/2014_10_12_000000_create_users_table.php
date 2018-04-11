<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 255)->nullable();
      $table->string('email')->unique()->nullable();
      $table->string('staff_id')->unique()->nullable();
      $table->unsignedInteger('branch_id')->nullable();
      $table->integer('hourly_rate')->default(0);
      $table->date('birth_date')->nullable();
      $table->date('start_date')->nullable();
      $table->string('phone_number')->nullable();
      $table->string('password');
      $table->tinyInteger('status')->default(1);
      $table->text('address')->nullable();
      $table->text('birth_place')->nullable();
      $table->tinyInteger('gender')->default(0);
      $table->tinyInteger('blood_type')->nullable();
      $table->tinyInteger('user_type')->nullable();
      $table->text('hobbies')->nullable();
      $table->text('pr_comments')->nullable();
      $table->unsignedInteger('thumbnail_id')->nullable();
      $table->rememberToken();
      $table->timestamps();

      // $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade')->onUpdate('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users');
  }
}
