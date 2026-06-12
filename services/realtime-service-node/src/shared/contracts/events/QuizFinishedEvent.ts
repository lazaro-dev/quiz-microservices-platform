import { z } from "zod";

export const QuizFinishedEventSchema = z.object({
    eventId: z.uuid(),
    quizId: z.number(),
    userId: z.number(),
    username: z.string(),
    avatar: z.string().optional(),
    score: z.number(),
    completedAt: z.string(),
});

export type QuizFinishedEvent = z.infer<typeof QuizFinishedEventSchema>;