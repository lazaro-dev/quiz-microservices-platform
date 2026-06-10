import { Server } from "socket.io";
import http from "http";

import { JwtService } from "@/modules/auth/JwtService";
import { SocketAuthMiddleware } from "@/modules/auth/SocketAuthMiddleware";
import { AuthenticatedSocket } from "@/shared/contracts/types/AuthenticatedSocket";

export class SocketServer {
    private io: Server;

    constructor(private readonly httpServer: http.Server) {
        this.io = new Server(
            this.httpServer,
            {
                cors: {
                    origin: "*",
                },
            }
        );
    }

    public initialize(): void {
        const jwtService = new JwtService();

        const authMiddleware = new SocketAuthMiddleware(jwtService);

        this.io.use(
            authMiddleware.handle.bind(authMiddleware)
        );

        this.io.on(
            "connection",
            (socket: AuthenticatedSocket) => {
                console.log(`Socket connected: ${socket.id}`);
                console.log(socket.data.user);
            }
        );
    }

    // const socket = io(
    //     "http://localhost:8080",
    //     {
    //         auth: {
    //             token: accessToken
    //         }
    //     }
    // );

    public getIO(): Server {
        return this.io;
    }
}