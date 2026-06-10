import { Channel } from "amqplib";
import { Exchanges } from "@/shared/contracts/rabbitmq/Exchanges";
import { RoutingKeys } from "@/shared/contracts/rabbitmq/RoutingKeys";
import { QueueNames } from "@/shared/contracts/rabbitmq/QueueNames";

export class RabbitMQTopology {
    constructor(private readonly channel: Channel) { }

    public async initialize(): Promise<void> {

        await this.channel.assertExchange(
            Exchanges.QUIZ_EVENTS,
            "topic",
            {
                durable: true,
            }
        );

        await this.channel.assertQueue(
            QueueNames.QUIZ_FINISHED,
            {
                durable: true,
            }
        );

        await this.channel.bindQueue(
            QueueNames.QUIZ_FINISHED,
            Exchanges.QUIZ_EVENTS,
            RoutingKeys.QUIZ_FINISHED
        );
    }
}