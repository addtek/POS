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
            $table->string('sn');
            $table->string('on');
            $table->string('un', 15)->unique();
            $table->string('email', 80)->unique();
            $table->string('phoneNum', 13)->unique();
            // $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('userRole');
            $table->string('token');
            $table->boolean('active')->default(true);
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
        Schema::dropIfExists('users');
    }
}
