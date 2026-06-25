export interface QuizDetails {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questionCount: number;
  playCount: number;
  averageScore: number;
  favoritesCount: number;
  estimatedTime: number;
}