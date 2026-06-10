import { RedisClient } from "@/infrastructure/redis/RedisClient";
import { LeaderboardRepository } from "@/modules/leaderboard/repositories/LeaderboardRepository";

describe(
    "LeaderboardRepository integração",
    () => {

        let redis: RedisClient;
        let repository: LeaderboardRepository;

        beforeAll(async () => {
            redis = new RedisClient();
            repository = new LeaderboardRepository(redis);
        });

        beforeEach(async () => {
            await redis.getInstance().flushdb();
        });

        afterAll(async () => {
            await redis.disconnect();
        });

        it(
            "É possível atualizar o ranking de um quiz",
            async () => {

                await repository.updateQuizScore({
                    quizId: 1,
                    userId: 10,
                    username: "Lazaro",
                    score: 500,
                    completedAt: new Date().toISOString(),
                });

                await repository.updateQuizScore({
                    quizId: 1,
                    userId: 20,
                    username: "Joao",
                    score: 1000,
                    completedAt: new Date().toISOString(),
                });

                const ranking = await repository.getLeaderboard(1);

                expect(ranking[0].userId).toBe(20);

                expect(ranking[0].position).toBe(1);

                expect(ranking[1].userId).toBe(10);
            }
        );

        it("É possível atualizar o ranking global", async () => {

            await repository.updateGlobalScore({
                quizId: 1,
                userId: 10,
                username: "Lazaro",
                score: 500,
                completedAt: new Date().toISOString(),
            });

            await repository.updateGlobalScore({
                quizId: 2,
                userId: 10,
                username: "Lazaro",
                score: 500,
                completedAt: new Date().toISOString(),
            });

            const ranking = await repository.getGlobalLeaderboard();

            expect(ranking[0].score).toBe(1000);
        });

    }
);