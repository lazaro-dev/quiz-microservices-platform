import Redis from "ioredis";
import { Env } from "@/config/Env";
import { logger } from "@/config/Logger";

export class RedisClient {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: Env.REDIS_HOST,
            port: Env.REDIS_PORT,
            db: Env.REDIS_DB,
        });

        this.registerEvents();
    }

    private registerEvents(): void {
        this.client.on("connect", () => {
            logger.info("Redis connected");
        });

        this.client.on("error", (error) => {
            logger.error(error);
        });
    }

    public getInstance(): Redis {
        return this.client;
    }

    public async disconnect(): Promise<void> {
        await this.client.quit();
    }
}