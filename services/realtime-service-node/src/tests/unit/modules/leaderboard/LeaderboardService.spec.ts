import { LeaderboardService } from "@/modules/leaderboard/services/LeaderboardService";
import { QuizFinishedEvent } from "@/shared/contracts/events/QuizFinishedEvent";

describe("LeaderboardService", () => {

    const repository = {
        markEventProcessed: jest.fn(),
        updateQuizScore: jest.fn(),
        updateGlobalScore: jest.fn(),
        getLeaderboard: jest.fn(),
        getGlobalLeaderboard: jest.fn(),
        saveUser: jest.fn(),
    };

    const gateway = {
        emitLeaderboardUpdated: jest.fn(),
        emitGlobalLeaderboardUpdated: jest.fn(),
    };

    const service = new LeaderboardService(
        repository as any,
        gateway as any
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve processar score e atualizar rankings", async () => {

        const event: QuizFinishedEvent = {
            eventId: "event-1",
            quizId: 1,
            userId: 10,
            username: "Lazaro",
            score: 500,
            completedAt: new Date().toISOString(),
        };

        repository.markEventProcessed.mockResolvedValue(true);

        repository.updateQuizScore.mockResolvedValue(true);

        repository.getLeaderboard.mockResolvedValue([
            {
                userId: 10,
                username: "Lazaro",
                avatar: null,
                score: 500,
                position: 1,
            },
        ]);

        repository.getGlobalLeaderboard.mockResolvedValue([
            {
                userId: 10,
                username: "Lazaro",
                avatar: null,
                score: 500,
                position: 1,
            },
        ]);

        await service.processScore(event);

        expect(
            repository.markEventProcessed
        ).toHaveBeenCalledWith("event-1");

        expect(
            repository.saveUser
        ).toHaveBeenCalledWith(event);

        expect(
            repository.updateQuizScore
        ).toHaveBeenCalledWith(event);

        expect(
            repository.updateGlobalScore
        ).toHaveBeenCalledWith(event);

        expect(
            repository.getLeaderboard
        ).toHaveBeenCalledWith(1);

        expect(
            repository.getGlobalLeaderboard
        ).toHaveBeenCalled();

        expect(
            gateway.emitLeaderboardUpdated
        ).toHaveBeenCalledWith(
            1,
            expect.objectContaining({
                quizId: 1,
                players: [
                    {
                        userId: 10,
                        username: "Lazaro",
                        avatar: null,
                        score: 500,
                        position: 1,
                    },
                ],
            })
        );

        expect(
            gateway.emitGlobalLeaderboardUpdated
        ).toHaveBeenCalledWith(
            expect.objectContaining({
                players: [
                    {
                        userId: 10,
                        username: "Lazaro",
                        avatar: null,
                        score: 500,
                        position: 1,
                    },
                ],
            })
        );
    });

    it("não deve processar evento duplicado", async () => {

        const event: QuizFinishedEvent = {
            eventId: "event-1",
            quizId: 1,
            userId: 10,
            username: "Lazaro",
            score: 500,
            completedAt: new Date().toISOString(),
        };

        repository.markEventProcessed.mockResolvedValue(false);

        await service.processScore(event);

        expect(
            repository.saveUser
        ).not.toHaveBeenCalled();

        expect(
            repository.updateQuizScore
        ).not.toHaveBeenCalled();

        expect(
            repository.updateGlobalScore
        ).not.toHaveBeenCalled();

        expect(
            gateway.emitLeaderboardUpdated
        ).not.toHaveBeenCalled();

        expect(
            gateway.emitGlobalLeaderboardUpdated
        ).not.toHaveBeenCalled();
    });

    it("não deve emitir ranking do quiz quando score for menor", async () => {

        const event: QuizFinishedEvent = {
            eventId: "event-2",
            quizId: 1,
            userId: 10,
            username: "Lazaro",
            score: 200,
            completedAt: new Date().toISOString(),
        };

        repository.markEventProcessed.mockResolvedValue(true);

        repository.updateQuizScore.mockResolvedValue(false);

        repository.getGlobalLeaderboard.mockResolvedValue([]);

        await service.processScore(event);

        expect(
            gateway.emitLeaderboardUpdated
        ).not.toHaveBeenCalled();

        expect(
            repository.updateGlobalScore
        ).toHaveBeenCalled();

        expect(
            gateway.emitGlobalLeaderboardUpdated
        ).toHaveBeenCalled();
    });

});