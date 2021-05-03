import { Injectable } from "@angular/core";
import { Score } from "../models/score.model";

@Injectable({
    providedIn: "root"
})
export class ScoreService {
    public uploadScore(score: Score): void {
        const scores = this.getAllScores();
        scores.push(score);
        localStorage.setItem("scores", JSON.stringify(scores));
    }

    public getAllScores(): Score[] {
        const scores = localStorage.getItem("scores");
        if (!scores) {
            return [];
        }
        const result = JSON.parse(scores);
        result.sort((a: Score, b: Score) => (a.score > b.score ? -1 : 1));
        return result;
    }
}
