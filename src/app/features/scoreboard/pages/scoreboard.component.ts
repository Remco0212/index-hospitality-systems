import { Component, OnInit } from "@angular/core";
import { ScoreService } from "../../../shared/services/score.service";
import { Score } from "../../../shared/models/score.model";

@Component({
    selector: "app-scoreboard",
    templateUrl: "./scoreboard.component.html",
    styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreBoardComponent implements OnInit {
    public scores: Score[] = [];
    constructor(private readonly scoreService: ScoreService) {}

    public ngOnInit(): void {
        this.scores = this.scoreService.getAllScores().slice(0, 10);
    }
}
