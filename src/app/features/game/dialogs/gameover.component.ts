import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-game-over",
    templateUrl: "./gameover.component.html",
    styleUrls: ["./gameover.component.scss"]
})
export class GameOverComponent {
    public name = "";
    constructor(public dialogRef: MatDialogRef<GameOverComponent>) { }

    public nameChanged(changedName: string): void {
        this.name = changedName;
    }

    public close(): void {
        if (this.name) {
            this.dialogRef.close(this.name);
        }
    }
}
