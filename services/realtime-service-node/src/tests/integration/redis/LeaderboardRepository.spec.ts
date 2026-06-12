import { RedisClient } from "@/infrastructure/redis/RedisClient";
import { LeaderboardRepository } from "@/modules/leaderboard/repositories/LeaderboardRepository";
import { QuizFinishedEvent } from "@/shared/contracts/events/QuizFinishedEvent";

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

        it("deve atualizar ranking do quiz", async () => {

            const event1: QuizFinishedEvent = {
                eventId: "event-1",
                quizId: 1,
                userId: 10,
                username: "Lazaro",
                score: 500,
                completedAt: new Date().toISOString(),
            };

            const event2: QuizFinishedEvent = {
                eventId: "event-2",
                quizId: 1,
                userId: 20,
                username: "Joao",
                score: 1000,
                completedAt: new Date().toISOString(),
            };

            await repository.saveUser(event1);

            await repository.saveUser(event2);

            await repository.updateQuizScore(event1);

            await repository.updateQuizScore(event2);

            const ranking = await repository.getLeaderboard(1);

            expect(
                ranking[0].userId
            ).toBe(20);

            expect(
                ranking[0].username
            ).toBe("Joao");

            expect(
                ranking[0].position
            ).toBe(1);

            expect(
                ranking[1].userId
            ).toBe(10);

            expect(
                ranking[1].username
            ).toBe("Lazaro");
        }
        );

        it(
            "deve manter apenas o maior score do usuário",
            async () => {

                const event: QuizFinishedEvent = {
                    eventId: "event-1",
                    quizId: 1,
                    userId: 10,
                    username: "Lazaro",
                    score: 1000,
                    completedAt: new Date().toISOString(),
                };

                await repository.saveUser(event);

                await repository.updateQuizScore(event);

                await repository.updateQuizScore({
                    ...event,
                    eventId: "event-2",
                    score: 500,
                });

                const ranking =
                    await repository.getLeaderboard(1);

                expect(
                    ranking[0].score
                ).toBe(1000);
            }
        );

        it("deve atualizar ranking global", async () => {

            const event1: QuizFinishedEvent = {
                eventId: "event-1",
                quizId: 1,
                userId: 10,
                username: "Lazaro",
                score: 500,
                completedAt: new Date().toISOString(),
            };

            const event2: QuizFinishedEvent = {
                eventId: "event-2",
                quizId: 2,
                userId: 10,
                username: "Lazaro",
                score: 500,
                completedAt: new Date().toISOString(),
            };

            await repository.saveUser(event1);

            await repository.updateGlobalScore(event1);

            await repository.updateGlobalScore(event2);

            const ranking = await repository.getGlobalLeaderboard();

            expect(
                ranking[0].userId
            ).toBe(10);

            expect(
                ranking[0].score
            ).toBe(1000);

            expect(
                ranking[0].username
            ).toBe("Lazaro");
        }
        );

        it("deve impedir processamento duplicado de eventos", async () => {

            const first = await repository.markEventProcessed("event-1");

            const second = await repository.markEventProcessed("event-1");

            expect(first).toBe(true);

            expect(second).toBe(false);
        }
        );
    }
);