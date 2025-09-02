<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('price');
            $table->string('size')->nullable(true);
            $table->text('product_description');
            $table->unsignedBigInteger('category_id');
            $table->unsignedInteger('product_availables');
            $table->string('product_link')->nullable();
            $table->string('image_path');

            $table->foreign('category_id')
            ->references('id')
            ->onDelete('cascade')
            ->on('product_categories');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
