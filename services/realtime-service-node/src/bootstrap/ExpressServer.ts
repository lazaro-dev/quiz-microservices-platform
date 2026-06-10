import http from "http";
import app from "@/app";
import { Env } from "@/config/Env";
import { logger } from "@/config/Logger";

export class ExpressServer {
    private readonly server: http.Server;

    constructor() {
        this.server = http.createServer(app);
    }

    public start(): void {
        this.server.listen(
            Env.PORT,
            () => logger.info(`HTTP Server running on port ${Env.PORT} `)
        );
    }

    public getInstance(): http.Server {
        return this.server;
    }
}
