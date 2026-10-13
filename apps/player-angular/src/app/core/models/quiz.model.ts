export interface Quiz {
    id: number;
    slug: string;
    title: string;
    description: string;
    image_url?: string;
    category: string;
    difficulty: string;
    cover_image?: string;
    questions_count: number;
    attempts_count: number;
    average_rating: number;
    total_ratings: number;
    game?: {
        id: number;
        title: string;
        slug: string;
    };
}