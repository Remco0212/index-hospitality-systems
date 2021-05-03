import { Component, OnInit } from "@angular/core";
import { DroppingObject } from "../models/dropping-object.model";
import { Score } from "../../../shared/models/score.model";
import { GameService } from "../services/game.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GameOverComponent } from "../dialogs/gameover.component";
import { ScoreService } from "../../../shared/services/score.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit{
    public countdownNumber = 3;
    public droppingItems: DroppingObject[] = [];
    public score: Score = new Score();
    private gameInterval!: any;

    constructor(
        private readonly gameService: GameService,
        private readonly scoreService: ScoreService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.startCountdown();
    }

    public ngOnInit(): void {
        this.score.score = 0;
        this.score.lives = 3;
    }    

    public startCountdown(): void {
        const interval = setInterval(() => {
            this.countdownNumber--;
            if (this.countdownNumber < 1) {
                clearInterval(interval);
                this.startGame();
            }
        }, 1000);
    }

    public droppingObjectClicked(droppingObject: DroppingObject): void {
        this.gameService.onDroppingObjectClicked(droppingObject);
    }

    private startGame(): void {
        this.gameInterval = setInterval(() => {
            window.requestAnimationFrame(() => {
                this.droppingItems = this.gameService.updateGameState();
                this.score = this.gameService.getCurrentScore();
                if (this.score.lives <= 0) {
                    this.gameEnded();
                }
            });
        }, 16);
    }

    private gameEnded(): void {
        clearInterval(this.gameInterval);
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(GameOverComponent, dialogConfig);
        const subscription = dialogRef.afterClosed().subscribe((result: string) => {
            this.score.name = result;
            this.scoreService.uploadScore(this.score);
            subscription.unsubscribe();
            this.router.navigate(["/"], { relativeTo: this.route });
        });
    }
}
