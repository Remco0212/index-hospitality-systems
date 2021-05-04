import { Injectable } from "@angular/core";
import { Score } from "../../../shared/models/score.model";
import { DroppingObject } from "../models/dropping-object.model";
import { Position } from "../models/position.model";

@Injectable({
    providedIn: "root"
})
export class GameService {
    private itemsOnScreen: DroppingObject[] = [];
    private score: Score = new Score();
    private shapes: string[] = ["rect", "circle", "triangle"];

    constructor() {}

    public resetGame(): void {
        this.score = new Score();
        this.itemsOnScreen = [];
    }

    public getCurrentScore(): Score {
        return this.score;
    }

    public generateNewItems(): void {
        const count = Math.max(
            Math.floor(Math.random() * (this.score.score * 0.1)),
            1
        );
        const hueStepSize = Math.floor(360 / (this.score.score + count));
        let hue = 0;
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * (window.innerWidth - 100));
            const position = new Position({
                x
            });

            hue = Math.floor(Math.random() * this.score.score * hueStepSize);
            const shape = this.shapes[
                Math.floor(Math.random() * this.shapes.length)
            ];
            const newDroppingObject = new DroppingObject({
                shape,
                position,
                color: hue
            });
            this.itemsOnScreen.push(newDroppingObject);
        }
    }

    public updateGameState(): DroppingObject[] {
        if (
            this.itemsOnScreen.every(
                (ios: DroppingObject) => !this.isItemOnScreen(ios)
            )
        ) {
            this.generateNewItems();
        }

        this.updateItemsOnScreen();
        this.cleanupItemsOnScreen();

        return this.itemsOnScreen;
    }

    public onDroppingObjectClicked(droppingObject: DroppingObject): void {
        if (!this.isItemOnScreen(droppingObject)) {
            return;
        }
        droppingObject.hit = true;
        this.score.score++;
    }

    private isItemOnScreen(droppingObject: DroppingObject): boolean {
        return window.innerHeight - 100 >= droppingObject.position.y;
    }

    private updateItemsOnScreen(): void {
        const activeObjects = this.itemsOnScreen.filter((ios: DroppingObject) =>
            this.isItemOnScreen(ios)
        );
        for (const object of activeObjects) {
            const nextPosition = Math.floor(Math.random() * 5);
            object.position.y += nextPosition;
        }
    }

    private cleanupItemsOnScreen(): void {
        const inActiveObjects = this.itemsOnScreen.filter(
            (ios: DroppingObject) => !this.isItemOnScreen(ios) || ios.hit
        );
        for (const object of inActiveObjects) {
            if (!object.hit) {
                if (this.score.score > 0) {
                    this.score.score--;
                }
            }
            this.itemsOnScreen.splice(this.itemsOnScreen.indexOf(object), 1);
        }
    }
}
