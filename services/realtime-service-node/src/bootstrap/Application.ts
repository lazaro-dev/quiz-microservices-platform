import { ExpressServer } from "./ExpressServer";
import { SocketServer } from "./SocketServer";
import { RedisClient } from "@/infrastructure/redis/RedisClient";
import { RabbitMQClient } from "@/infrastructure/rabbitmq/RabbitMQClient";
import { LeaderboardModule } from "@/modules/leaderboard/LeaderboardModule";
import { BootstrapContext } from "./BootstrapContext";

export class Application {
    public async bootstrap(): Promise<void> {
        const redis = new RedisClient();

        // await redis.connect();

        const rabbit = new RabbitMQClient();

        await rabbit.connect();

        const httpServer = new ExpressServer();

        const socketServer = new SocketServer(
            httpServer.getInstance()
        );

        socketServer.initialize();

        const context: BootstrapContext = {
            redis,
            rabbit,
            socket: socketServer,
        };

        const leaderboardModule = new LeaderboardModule(context);

        await leaderboardModule.initialize();

        httpServer.start();
    }

}
