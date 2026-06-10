import { Server } from "socket.io";
import { SocketEvents } from "@/shared/contracts/websocket/SocketEvents";
import { SocketRooms } from "@/shared/contracts/websocket/SocketRooms";
import { logger } from "@/config/Logger";

export class SocketGateway {
    constructor(private readonly io: Server) { }

    public initialize(): void {
        this.io.on("connection", (socket) => {
            console.log(`Socket connected ${socket.id}`);

            logger.info({
                socketId: socket.id,
                userId: socket.data.user.sub,
                username:
                    socket.data.user.username,
            });

            socket.on(
                "disconnect",
                (reason) => {

                    logger.info({
                        socketId: socket.id,
                        reason,
                    });
                }
            );

            socket.onAny(
                (eventName) => {
                    logger.debug({
                        socketId: socket.id,
                        eventName,
                    });
                }
            );
            // socket.on(
            //     SocketEvents.LEADERBOARD_SUBSCRIBE,
            //     ({ quizId }) => {
            //         socket.join(
            //             SocketRooms.leaderboard(quizId)
            //         );
            //     }
            // );

            // socket.on(
            //     SocketEvents.LEADERBOARD_UNSUBSCRIBE,
            //     ({ quizId }) => {
            //         socket.leave(
            //             SocketRooms.leaderboard(quizId)
            //         );
            //     }
            // );
        });
    }
}