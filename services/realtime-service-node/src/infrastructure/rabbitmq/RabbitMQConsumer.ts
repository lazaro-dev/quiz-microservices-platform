import { Channel, ConsumeMessage } from "amqplib";
import { logger } from "@/config/Logger";

export abstract class RabbitMQConsumer {
    constructor(
        protected readonly channel: Channel
    ) { }

    protected abstract queue(): string;

    protected abstract handle(message: ConsumeMessage): Promise<void>;

    public async consume(): Promise<void> {
        await this.channel.consume(
            this.queue(),
            async (message) => {
                if (!message) {
                    return;
                }

                try {
                    await this.handle(message);

                    this.channel.ack(message);
                } catch (error) {
                    logger.error(error);

                    this.channel.nack(message, false, false);
                }
            }
        );
    }
}