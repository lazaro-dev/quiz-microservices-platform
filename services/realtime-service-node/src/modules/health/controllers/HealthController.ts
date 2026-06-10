import { Request, Response } from "express";
import { HealthService } from "@modules/health/services/HealthService";

export class HealthController {

    constructor(private readonly service: HealthService) { }

    public check = async (_: Request, res: Response) => {
        const result = await this.service.check();

        return res.json(result);
    };
}