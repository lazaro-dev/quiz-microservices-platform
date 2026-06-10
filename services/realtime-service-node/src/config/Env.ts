import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(8080),

    REDIS_HOST: z.string().default("localhost"),

    REDIS_PORT: z.coerce.number().default(6379),

    REDIS_DB: z.coerce.number().default(0),

    RABBITMQ_URL: z.string().default("amqp://guest:guest@localhost:5672"),

    JWT_SECRET: z.string(),
});

export const Env = envSchema.parse(
    process.env
);