<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlarmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alarms', function (Blueprint $table) {
            $table->increments('id');
            $table->date('alarm_date')->nullable();
            $table->time('alarm_time')->nullable();
            $table->longText('message')->nullable();
            $table->json('recipients')->nullable();
            $table->timestamps();
        });
        Schema::create('alarm_user', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('alarm_id')->nullable();
            $table->timestamps();
        });
        Schema::create('alarm_position', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('position_id')->nullable();
            $table->unsignedInteger('alarm_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alarms');
        Schema::dropIfExists('alarm_user');
        Schema::dropIfExists('alarm_position');
    }
}
