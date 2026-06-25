import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-quiz-stats',
    standalone: true,
    templateUrl: './quiz-stats.html',
    styleUrl: './quiz-stats.scss'
})
export class QuizStats {
    @Input() questionsCount = 0;
    @Input() totalPlays = 0;
    @Input() averageScore = 0;
    @Input() estimatedDuration = 0;
}