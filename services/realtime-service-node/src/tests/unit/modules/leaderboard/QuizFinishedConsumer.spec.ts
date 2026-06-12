import { ConsumeMessage } from "amqplib";

import { QuizFinishedConsumer } from "@/modules/leaderboard/consumers/QuizFinishedConsumer";

describe("QuizFinishedConsumer", () => {

    const service = {
        processScore: jest.fn(),
    };

    const channel = {} as any;

    const consumer = new QuizFinishedConsumer(
        channel,
        service as any
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve processar evento válido", async () => {

        const payload = {
            eventId: "550e8400-e29b-41d4-a716-446655440000",
            quizId: 1,
            userId: 10,
            username: "Lazaro",
            avatar: "src/avatar.jpg",
            score: 500,
            completedAt: new Date().toISOString(),
        };

        const message = {
            content: Buffer.from(
                JSON.stringify(payload)
            ),
        } as ConsumeMessage;

        await (consumer as any).handle(message);

        expect(
            service.processScore
        ).toHaveBeenCalledTimes(1);

        expect(
            service.processScore
        ).toHaveBeenCalledWith(payload);
    });

    it("deve lançar erro para payload inválido", async () => {

        const message = {
            content: Buffer.from(
                JSON.stringify({
                    quizId: 1,
                })
            ),
        } as ConsumeMessage;

        await expect(
            (consumer as any).handle(message)
        ).rejects.toThrow();

        expect(
            service.processScore
        ).not.toHaveBeenCalled();
    });

    it("deve lançar erro quando json for inválido", async () => {

        const message = {
            content: Buffer.from(
                "{ json invalido"
            ),
        } as ConsumeMessage;

        await expect(
            (consumer as any).handle(message)
        ).rejects.toThrow();

        expect(
            service.processScore
        ).not.toHaveBeenCalled();
    });

});