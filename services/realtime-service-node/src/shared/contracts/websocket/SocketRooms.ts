export class SocketRooms {
    public static leaderboard(quizId: number): string {
        return `leaderboard:quiz:${quizId}`;
    }

    public static globalLeaderboard(): string {
        return "leaderboard:global";
    }
}