import { ConsumeMessage } from "amqplib";

import { QuizFinishedConsumer } from "@/modules/leaderboard/consumers/QuizFinishedConsumer";

describe("QuizFinishedConsumer", () => {

    const service = {
        processScore: jest.fn(),
    };

    const channel = {} as any;

    const consumer =
        new QuizFinishedConsumer(
            channel,
            service as any
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Processa o evento e chama o serviço", async () => {

        const payload = {
            quizId: 1,
            userId: 10,
            username: "Lazaro",
            score: 500,
            completedAt: new Date().toISOString(),
        };

        const message = {
            content: Buffer.from(
                JSON.stringify(payload)
            ),
        } as ConsumeMessage;

        await (
            consumer as any
        ).handle(message);

        expect(
            service.processScore
        ).toHaveBeenCalledWith(payload);

    });

});