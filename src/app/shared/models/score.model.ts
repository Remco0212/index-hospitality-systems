export class Score {
    public name: string;
    public score: number;

    constructor(data?: { name: string; score: number }) {
        this.name = data?.name || "";
        this.score = data?.score || 0;
    }
}
