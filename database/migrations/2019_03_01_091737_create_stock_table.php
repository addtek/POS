<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock', function (Blueprint $table) {
            $table->increments('id');
            $table->string('category', 20);
            $table->string('itemName', 50)->unique();
            $table->integer('numberInStock');
            $table->double('pricePerItem', 5 , 2);
            $table->string('addedBy', 15);
            $table->timestamps();
            $table->foreign('addedBy')->references('un')->on('users')->onUpdate('cascade');
            $table->foreign('category')->references('categoryID')->on('item_category')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock');
    }
}
