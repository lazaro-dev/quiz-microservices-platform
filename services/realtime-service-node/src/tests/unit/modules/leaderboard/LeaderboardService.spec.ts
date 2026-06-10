import { LeaderboardService } from "@/modules/leaderboard/services/LeaderboardService";
import { QuizFinishedEvent } from "@/shared/contracts/events/QuizFinishedEvent";

describe("LeaderboardService", () => {

    const repository = {
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

    it("Processa o score e atualiza o ranking", async () => {

        const event: QuizFinishedEvent = {
            quizId: 1,
            userId: 10,
            username: "Lazaro",
            score: 500,
            completedAt: new Date().toISOString(),
        };

        repository.getLeaderboard.mockResolvedValue([
            {
                userId: 10,
                username: "Lazaro",
                score: 500,
                position: 1,
            },
        ]);

        repository.getGlobalLeaderboard.mockResolvedValue([]);

        await service.processScore(event);

        expect(
            repository.updateQuizScore
        ).toHaveBeenCalledWith(event);

        expect(
            repository.updateGlobalScore
        ).toHaveBeenCalledWith(event);

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
            {
                quizId: 1,
                players: [
                    {
                        userId: 10,
                        username: "Lazaro",
                        score: 500,
                        position: 1,
                    },
                ],
            }
        );

        expect(
            gateway.emitGlobalLeaderboardUpdated
        ).toHaveBeenCalledWith({
            players: [],
        });
    });

});