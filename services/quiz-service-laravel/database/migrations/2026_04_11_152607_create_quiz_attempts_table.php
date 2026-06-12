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
        Schema::create('quiz_attempts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('quiz_id');

            $table->integer('score');
            $table->decimal('accuracy', 5, 2);
            $table->integer('total_questions');
            $table->integer('correct_answers');
            $table->integer('time_seconds');
            $table->timestamps();
            
            $table->string('username');
            $table->string('avatar_url')
                ->nullable();

            $table->foreign('quiz_id')
                ->references('id')
                ->on('quizzes')
                ->onDelete('cascade');

            $table->index('user_id');

            $table->index('quiz_id');

            $table->index([
                'quiz_id',
                'user_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_attempts');
    }
};
