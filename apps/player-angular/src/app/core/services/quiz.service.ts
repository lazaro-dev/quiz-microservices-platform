import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  findBySlug(slug: string) {

    console.log('GET /quizzes/' + slug);

    return null;
  }
}
