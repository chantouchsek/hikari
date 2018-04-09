<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttendancesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('attendances', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('user_id')->nullable();
      $table->unsignedInteger('branch_id')->nullable();
      $table->dateTime('start_time')->nullable();
      $table->dateTime('leave_time')->nullable();
      $table->dateTime('break_start')->nullable();
      $table->dateTime('break_finish')->nullable();
      $table->integer('type_attendance')->nullable();
      $table->string('hourly_rate')->nullable();
      $table->boolean('meal')->nullable();
      $table->boolean('late')->nullable();
      $table->boolean('early_leave')->nullable();
      $table->boolean('over_time')->nullable();
      $table->tinyInteger('status')->default(0);
      $table->text('notes')->nullable();
      $table->timestamps();

      $table->foreign('user_id')->references('id')->on('users');
      $table->foreign('branch_id')->references('id')->on('branches');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('attendances');
  }
}
