import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '@/app/core/models/quiz.model';

export interface QuizCardModel {
  id: number;
  title: string;
  slug: string;
  category: string;
  questionCount: number;
  playCount: number;
}

@Component({
  selector: 'app-quiz-card',
  imports: [],
templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.scss',
})
export class QuizCard {

  readonly quiz = input.required<Quiz>();
  private readonly router = inject(Router);

  toQuiz(slug: string): void {
    this.router.navigate([
      '/player',
      'quiz',
      slug,
    ]);
  }
}
