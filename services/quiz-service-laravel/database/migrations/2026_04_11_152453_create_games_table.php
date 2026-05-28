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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('game_type_id');

            $table->string('name');
            $table->string('slug')->unique();
            $table->string('cover_image')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();

            $table->foreign('game_type_id')
                ->references('id')
                ->on('game_types')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
