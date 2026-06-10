import { Server } from "socket.io";
import { SocketEvents } from "@/shared/contracts/websocket/SocketEvents";
import { SocketRooms } from "@/shared/contracts/websocket/SocketRooms";
import { LeaderboardUpdatedDto } from "@/modules/leaderboard/dto/LeaderboardUpdatedDto";
import { LeaderboardPlayerDto } from "@/modules/leaderboard/dto/LeaderboardPlayerDto";

export class LeaderboardGateway {
    constructor(private readonly io: Server) { }

    public emitLeaderboardUpdated(quizId: number, payload: LeaderboardUpdatedDto): void {
        this.io
            .to(SocketRooms.leaderboard(quizId))
            .emit(
                SocketEvents.LEADERBOARD_UPDATED,
                payload
            );
    }

    public emitGlobalLeaderboardUpdated(payload: { players: LeaderboardPlayerDto[]; }): void {
        this.io
            .to(
                SocketRooms.globalLeaderboard()
            )
            .emit(
                SocketEvents.GLOBAL_LEADERBOARD_UPDATED,
                payload
            );
    }
}