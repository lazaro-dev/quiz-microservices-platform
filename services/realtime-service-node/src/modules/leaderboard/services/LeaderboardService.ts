import { LeaderboardPlayerDto } from "../dto/LeaderboardPlayerDto";
import { LeaderboardGateway } from "../gateways/LeaderboardGateway";
import { LeaderboardRepository } from "../repositories/LeaderboardRepository";

import { QuizFinishedEvent } from "@/shared/contracts/events/QuizFinishedEvent";

export class LeaderboardService {

    constructor(
        private readonly repository: LeaderboardRepository,
        private readonly gateway: LeaderboardGateway,
    ) { }

    public async processScore(event: QuizFinishedEvent): Promise<void> {

        await this.repository.saveUser(event);

        await this.repository.updateQuizScore(event);

        await this.repository.updateGlobalScore(event);

        const players = await this.repository.getLeaderboard(
            event.quizId
        );

        this.gateway.emitLeaderboardUpdated(
            event.quizId,
            {
                quizId:
                    event.quizId,

                players,
            }
        );

        const globalPlayers = await this.repository.getGlobalLeaderboard();

        this.gateway.emitGlobalLeaderboardUpdated({
            players: globalPlayers,
        });
    }

    public async getLeaderboard(quizId: number, limit = 10): Promise<LeaderboardPlayerDto[]> {
        return this.repository.getLeaderboard(
            quizId,
            limit
        );
    }

    public async getGlobalLeaderboard(
        limit = 10
    ): Promise<LeaderboardPlayerDto[]> {

        return this.repository
            .getGlobalLeaderboard(
                limit
            );
    }
}