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

        const isNew = await this.repository
            .markEventProcessed(
                event.eventId
            );

        if (!isNew) {
            return;
        }

        await this.repository.saveUser(event);

        const updated = await this.repository.updateQuizScore(event);

        await this.repository.updateGlobalScore(event);

        if (updated) {
            const players = await this.repository.getLeaderboard(event.quizId);

            this.gateway.emitLeaderboardUpdated(
                event.quizId,
                {
                    quizId: event.quizId,
                    players,
                    updatedAt: Date.now(),
                }
            );
        }

        const globalPlayers = await this.repository.getGlobalLeaderboard();

        this.gateway.emitGlobalLeaderboardUpdated({
            players: globalPlayers,
            updatedAt: Date.now(),
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