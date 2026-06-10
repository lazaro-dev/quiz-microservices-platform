import { Socket } from "socket.io";

import { JwtService } from "./JwtService";

export class SocketAuthMiddleware {

    constructor(private readonly jwtService: JwtService) { }

    public handle(socket: Socket, next: (err?: Error) => void): void {
        try {
            const token = socket.handshake.auth?.token;

            if (!token) {
                return next(new Error("Unauthorized"));
            }

            socket.data.user = this.jwtService.verify(token);

            next();
        } catch {
            next(new Error("Unauthorized"));
        }
    }
}