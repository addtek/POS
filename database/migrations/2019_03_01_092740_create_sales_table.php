<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->increments('id');
            $table->string('itemName', 50);
            $table->integer('quantity');
            $table->double('price', 5, 2);
            $table->string('remarks');
            $table->string('addedBy', 15);
            $table->timestamps();
            $table->foreign('itemName')->references('itemName')->on('stock')->onUpdate('cascade');
            $table->foreign('addedBy')->references('un')->on('users')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
