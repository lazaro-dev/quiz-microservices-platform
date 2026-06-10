import { RedisClient } from "@/infrastructure/redis/RedisClient";

import { QuizFinishedEvent } from "@/shared/contracts/events/QuizFinishedEvent";

import { LeaderboardKeys } from "../constants/LeaderboardKeys";
import { LeaderboardPlayerDto } from "../dto/LeaderboardPlayerDto";
import { LeaderboardUserMetadata } from "../types/LeaderboardUserMetadata";

export class LeaderboardRepository {

    private readonly redis;

    constructor(
        redisClient: RedisClient
    ) {
        this.redis =
            redisClient.getInstance();
    }

    public async saveUser(event: QuizFinishedEvent): Promise<void> {

        await this.redis.hset(
            LeaderboardKeys.users(),
            String(event.userId),
            JSON.stringify({
                username: event.username,
                avatar: event.avatar,
            })
        );
    }

    public async updateQuizScore(
        event: QuizFinishedEvent
    ): Promise<void> {

        await this.redis.zadd(
            LeaderboardKeys.quiz(
                event.quizId
            ),
            event.score,
            String(event.userId)
        );
    }

    public async updateGlobalScore(
        event: QuizFinishedEvent
    ): Promise<void> {

        await this.redis.zincrby(
            LeaderboardKeys.global(),
            event.score,
            String(event.userId)
        );
    }

    public async getLeaderboard(quizId: number, limit = 10): Promise<LeaderboardPlayerDto[]> {

        const ranking = await this.redis.zrevrange(
            LeaderboardKeys.quiz(quizId),
            0,
            limit - 1,
            "WITHSCORES"
        );

        const userIds: number[] = [];

        for (let i = 0; i < ranking.length; i += 2) {
            userIds.push(
                Number(ranking[i])
            );
        }

        const pipeline = this.redis.pipeline();

        userIds.forEach(
            (userId) => {
                pipeline.hget(
                    LeaderboardKeys.users(),
                    String(userId)
                );
            }
        );

        const metadataResults = await pipeline.exec();

        const players: LeaderboardPlayerDto[] = [];

        for (let i = 0; i < userIds.length; i++) {

            const metadata = metadataResults?.[i]?.[1] as string | null;

            const user: LeaderboardUserMetadata = metadata
                ? JSON.parse(metadata)
                : { username: "Unknown", avatar: null };

            players.push({
                userId: userIds[i],
                username: user.username,
                avatar: user.avatar,
                score: Number(
                    ranking[(i * 2) + 1]
                ),
                position: i + 1,
            });
        }

        return players;
    }

    public async getGlobalLeaderboard(limit = 10): Promise<LeaderboardPlayerDto[]> {

        const ranking = await this.redis.zrevrange(
            LeaderboardKeys.global(),
            0,
            limit - 1,
            "WITHSCORES"
        );

        const userIds: number[] = [];

        for (let i = 0; i < ranking.length; i += 2) {
            userIds.push(
                Number(ranking[i])
            );
        }

        const pipeline = this.redis.pipeline();

        userIds.forEach(
            (userId) => {
                pipeline.hget(
                    LeaderboardKeys.users(),
                    String(userId)
                );
            }
        );

        const metadataResults = await pipeline.exec();

        const players: LeaderboardPlayerDto[] = [];

        for (let i = 0; i < userIds.length; i++) {

            const metadata = metadataResults?.[i]?.[1] as string | null;

            const user = metadata
                ? JSON.parse(metadata)
                : {
                    username: "Unknown",
                };

            players.push({
                userId: userIds[i],
                username: user.username,
                avatar: user.avatar,
                score: Number(
                    ranking[(i * 2) + 1]
                ),
                position: i + 1,
            });
        }

        return players;
    }
}