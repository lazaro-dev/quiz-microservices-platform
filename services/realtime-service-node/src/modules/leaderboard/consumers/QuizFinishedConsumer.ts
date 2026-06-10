import { Channel, ConsumeMessage } from "amqplib";
import { logger } from "@/config/Logger";
import { RabbitMQConsumer } from "@/infrastructure/rabbitmq/RabbitMQConsumer";
import { LeaderboardService } from "@/modules/leaderboard/services/LeaderboardService";
import { QuizFinishedEventSchema } from "@/shared/contracts/events/QuizFinishedEvent";
import { QueueNames } from "@/shared/contracts/rabbitmq/QueueNames";

export class QuizFinishedConsumer extends RabbitMQConsumer {

    constructor(
        channel: Channel,
        private readonly leaderboardService: LeaderboardService
    ) {
        super(channel);
    }

    protected queue(): string {
        return QueueNames.QUIZ_FINISHED;
    }

    protected async handle(message: ConsumeMessage): Promise<void> {

        const payload = QuizFinishedEventSchema.parse(
            JSON.parse(
                message.content.toString()
            )
        );

        logger.info({
            quizId: payload.quizId,
            userId: payload.userId,
            score: payload.score,
            username: payload.username,
        }, "Quiz finished event received");

        await this.leaderboardService.processScore(payload);
    }
}