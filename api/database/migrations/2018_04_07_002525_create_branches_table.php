<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBranchesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('branches', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name')->nullable();
      $table->text('super_user_daily_report_template')->nullable();
      $table->text('manager_daily_report_template')->nullable();
      $table->text('sub_manager_daily_report_template')->nullable();
      $table->text('full_time_staff_daily_report_template')->nullable();
      $table->text('part_time_staff_daily_report_template')->nullable();
      $table->tinyInteger('status')->default(0);
      $table->unsignedInteger('thumbnail_id')->nullable();
      $table->timestamps();

      $table->foreign('thumbnail_id')->references('id')->on('media');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('branches');
  }
}
