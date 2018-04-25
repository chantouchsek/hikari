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
            $table->date('date')->nullable();
            $table->float('sales')->nullable();
            $table->float('cost')->nullable();
            $table->integer('total_guest')->nullable();
            $table->integer('guest_type')->nullable();
            $table->float('unit_sale')->nullable()->comment('Automatic (Sales / Total Guest)');
            $table->float('cross_profit')->nullable()->comment('Automatic (Sales - Cost)');
            $table->string('quest_a')->nullable();
            $table->string('quest_b')->nullable();
            $table->string('quest_c')->nullable();
            $table->longText('comments')->nullable();
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
