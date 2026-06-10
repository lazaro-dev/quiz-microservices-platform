import { HealthService } from "@/modules/health/services/HealthService";

describe("HealthService", () => {

    it("should return UP status", async () => {

        const redis = {
            getInstance: () => ({
                ping: jest.fn().mockResolvedValue("PONG"),
            }),
        };

        const rabbit = {
            getChannel: jest.fn(),
        };

        const service =
            new HealthService(
                redis as any,
                rabbit as any
            );

        const result =
            await service.check();

        expect(result.status)
            .toBe("UP");

        expect(result.redis)
            .toBe("UP");

        expect(result.rabbitmq)
            .toBe("UP");

    });

});