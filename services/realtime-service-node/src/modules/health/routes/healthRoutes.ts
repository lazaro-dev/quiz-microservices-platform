import { Router } from "express";

import { HealthController } from "@modules/health/controllers/HealthController";
import { HealthService } from "@modules/health/services/HealthService";
import { RedisClient } from "@/infrastructure/redis/RedisClient";
import { RabbitMQClient } from "@/infrastructure/rabbitmq/RabbitMQClient";

export function createHealthRoutes(): Router {

    const router = Router();

    const redis = new RedisClient();

    const rabbitMQ = new RabbitMQClient();

    const service = new HealthService(redis, rabbitMQ);

    const controller = new HealthController(service);

    router.get("/health", controller.check);

    return router;
}