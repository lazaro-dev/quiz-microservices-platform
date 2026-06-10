import { LeaderboardPlayerDto } from "./LeaderboardPlayerDto";

export interface LeaderboardUpdatedDto {
    quizId: number;
    players: LeaderboardPlayerDto[];
}