import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizStats } from '@/app/shared/quiz-stats/quiz-stats';

export interface QuizDetails {
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    questionsCount: number;
    totalPlays: number;
    averageScore: number;
    estimatedDuration: number;
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
    quiz!: QuizDetails;

    @Output()
    startQuiz = new EventEmitter<void>();

    @Output()
    favorite = new EventEmitter<void>();
}