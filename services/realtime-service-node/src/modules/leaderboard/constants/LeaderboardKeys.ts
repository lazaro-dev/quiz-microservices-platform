export class LeaderboardKeys {
    public static quiz(quizId: number): string {
        return `leaderboard:quiz:${quizId}`;
    }

    public static global(): string {
        return "leaderboard:global";
    }

    public static users(): string {
        return "leaderboard:users";
    }
}