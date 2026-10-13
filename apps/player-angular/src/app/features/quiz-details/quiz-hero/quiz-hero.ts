import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizStats } from '@/app/shared/quiz-stats/quiz-stats';
import { Quiz } from '@/app/core/models/quiz.model';

export interface QuizDetails {
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    // questionsCount: number;
    // totalPlays: number;
    averageRating: number;
    totalRatings: number;
    questionCount: number;
    playCount: number;
}

@Component({
    selector: 'app-quiz-hero',
    standalone: true,
    imports: [QuizStats],
    templateUrl: './quiz-hero.html',
    styleUrl: './quiz-hero.scss'
})
export class QuizHeroComponent {
    @Input({ required: true })
    quiz!: Quiz;

    @Output()
    startQuiz = new EventEmitter<void>();

    @Output()
    favorite = new EventEmitter<void>();

    public difficultyLabel(difficulty: number,): string {
        switch (difficulty) {
            case 1:
                return 'Fácil';

            case 2:
                return 'Médio';

            case 3:
                return 'Difícil';

            default:
                return '-';
        }
    }
}