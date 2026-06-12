import { Server } from "socket.io";
import { LeaderboardService } from "@/modules/leaderboard/services/LeaderboardService";
import { AuthenticatedSocket } from "@/shared/contracts/types/AuthenticatedSocket";
import { SocketEvents } from "@/shared/contracts/websocket/SocketEvents";
import { SocketRooms } from "@/shared/contracts/websocket/SocketRooms";

export class LeaderboardSocketHandler {

    constructor(
        private readonly io: Server,
        private readonly leaderboardService: LeaderboardService,
    ) { }

    public register(): void {

        this.io.on("connection", (socket: AuthenticatedSocket) => {
            socket.on(
                SocketEvents.LEADERBOARD_SUBSCRIBE,
                async ({ quizId }) => {

                    socket.join(
                        SocketRooms.leaderboard(
                            quizId
                        )
                    );

                    const leaderboard =
                        await this.leaderboardService
                            .getLeaderboard(
                                quizId
                            );

                    socket.emit(
                        SocketEvents.LEADERBOARD_UPDATED,
                        {
                            quizId,
                            players: leaderboard,
                            updatedAt: Date.now(),
                        }
                    );
                }
            );

            socket.on(
                SocketEvents.LEADERBOARD_UNSUBSCRIBE,
                ({ quizId }) => {

                    socket.leave(
                        SocketRooms.leaderboard(
                            quizId
                        )
                    );
                }
            );

            socket.on(
                SocketEvents.GLOBAL_LEADERBOARD_SUBSCRIBE,
                async () => {

                    socket.join(
                        SocketRooms.globalLeaderboard()
                    );

                    const players =
                        await this.leaderboardService
                            .getGlobalLeaderboard();

                    socket.emit(
                        SocketEvents.GLOBAL_LEADERBOARD_UPDATED,
                        {
                            players,
                        }
                    );
                }
            );
        }
        );
    }
}