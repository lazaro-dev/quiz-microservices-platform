import { RedisClient } from "@/infrastructure/redis/RedisClient";
import { RabbitMQClient } from "@/infrastructure/rabbitmq/RabbitMQClient";

export class HealthService {

    constructor(
        private readonly redis: RedisClient,
        private readonly rabbit: RabbitMQClient
    ) { }

    public async check() {

        let redisStatus = "DOWN";
        let rabbitStatus = "DOWN";

        try {
            await this.redis.getInstance().ping();

            redisStatus = "UP";
        } catch { }

        try {
            this.rabbit.getChannel();
            rabbitStatus = "UP";
        } catch { }

        return {
            service: "realtime-service",
            status: "UP",
            redis: redisStatus,
            rabbitmq: rabbitStatus, 
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }
}