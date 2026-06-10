import { Channel } from "amqplib";

export class RabbitMQPublisher {

    constructor(private readonly channel: Channel) { }

    public publish(exchange: string, routingKey: string, payload: unknown): boolean {
        return this.channel.publish(
            exchange,
            routingKey,
            Buffer.from(
                JSON.stringify(payload)
            )
        );
    }
}