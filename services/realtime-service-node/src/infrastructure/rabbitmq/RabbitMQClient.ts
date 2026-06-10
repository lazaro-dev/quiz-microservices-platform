import amqp, { Channel, ChannelModel } from "amqplib";
import { Env } from "@/config/Env";
import { logger } from "@/config/Logger";
import { RabbitMQTopology } from "./RabbitMQTopology";

export class RabbitMQClient {
    private connection!: ChannelModel;

    private channel!: Channel;

    async connect(): Promise<void> {
        this.connection = await amqp.connect(Env.RABBITMQ_URL);

        this.channel = await this.connection.createChannel();

        const topology = new RabbitMQTopology(this.channel);

        await topology.initialize();

        logger.info("RabbitMQ connected");
    }

    public getChannel(): Channel {
        return this.channel;
    }
}
