import { BootstrapContext } from "@/bootstrap/BootstrapContext";
import { QuizFinishedConsumer } from "@/modules/leaderboard/consumers/QuizFinishedConsumer";
import { LeaderboardGateway } from "@modules/leaderboard/gateways/LeaderboardGateway";
import { LeaderboardRepository } from "@modules/leaderboard/repositories/LeaderboardRepository";
import { LeaderboardService } from "@modules/leaderboard/services/LeaderboardService";
import { LeaderboardSocketHandler } from "@/modules/leaderboard/handlers/LeaderboardSocketHandler";
import { logger } from "@/config/Logger";

export class LeaderboardModule {
    constructor(private readonly context: BootstrapContext) { }

    public async initialize(): Promise<void> {

        const repository = new LeaderboardRepository(
            this.context.redis
        );

        const gateway = new LeaderboardGateway(
            this.context.socket.getIO()
        );

        const service = new LeaderboardService(
            repository,
            gateway
        );

        const handler =
            new LeaderboardSocketHandler(
                this.context.socket.getIO(),
                service
            );

        handler.register();

        logger.info("Leaderboard socket handler registered");

        const consumer = new QuizFinishedConsumer(
            this.context.rabbit.getChannel(),
            service
        );

        await consumer.consume();

        logger.info("QuizFinishedConsumer registered");
    }
}