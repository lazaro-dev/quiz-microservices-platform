import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Quiz } from '@/app/core/models/quiz.model';
import { PaginatedResponse } from '@/app/core/models/paginate-response.model';

@Injectable({
    providedIn: 'root',
})
export class QuizService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = 'http://localhost:8080';

    search(
        page: number,
        search: string | null,
        gameId: number | null,
        difficulty: string | null
    ): Observable<PaginatedResponse<Quiz>> {

        let params = `?page=${page}`;
        if (search) {
            params += `&search=${search}`;
        }

        if (gameId) {
            params += `&game_id=${gameId}`;
        }

        if (difficulty) {
            params += `&difficulty=${difficulty}`;
        }

        return this.http.get<PaginatedResponse<Quiz>>(
            `${this.apiUrl}/quizzes/public/quizzes${params}`
        );
    }

    findBySlug(slug: string): Observable<Quiz> {
        return this.http.get<Quiz>(
            `${this.apiUrl}/quizzes/${slug}`
        );
    }
}