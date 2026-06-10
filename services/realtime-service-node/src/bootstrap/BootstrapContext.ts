import { RedisClient } from "@/infrastructure/redis/RedisClient";
import { RabbitMQClient } from "@/infrastructure/rabbitmq/RabbitMQClient";
import { SocketServer } from "./SocketServer";

export interface BootstrapContext {
    redis: RedisClient;
    rabbit: RabbitMQClient;
    socket: SocketServer;
}