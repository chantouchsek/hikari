<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailyReportsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('daily_reports', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('user_id')->nullable();
      $table->unsignedInteger('branch_id')->nullable();
      $table->float('sales')->nullable();
      $table->integer('number_customers')->nullable();
      $table->integer('customer_type')->nullable();
      $table->float('cost')->nullable();
      $table->float('total_price')->nullable();
      $table->float('rough_interest')->nullable();
      $table->float('price_per_customer')->nullable();
      $table->string('quest_a')->nullable();
      $table->string('quest_b')->nullable();
      $table->longText('notes')->nullable();
      $table->date('date')->nullable();
      $table->unsignedInteger('thumbnail_id')->nullable();
      $table->timestamps();

      //$table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      //$table->foreign('branch_id')->references('id')->on('branches')->onUpdate('cascade')->onDelete('cascade');
      //$table->foreign('thumbnail_id')->references('id')->on('media')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('daily_reports');
  }
}
