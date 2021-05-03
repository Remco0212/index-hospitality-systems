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

    constructor() { }

    public getCurrentScore(): Score {
        return this.score;
    }

    public generateNewItems(): DroppingObject[] {
        const count = Math.max(Math.floor(Math.random() * (this.score.score * 0.2)), 1);
        const hueStepSize = 360 / (count + 1);
        let hue = 0;
        const newAddedItems: DroppingObject[] = [];
        for (let i = 0; i < count; i++) {
            const width = Math.floor(Math.random() * (window.innerWidth - 100));
            const position = new Position({
                x: width
            });

            hue = hue + hueStepSize
            const newDroppingObject = new DroppingObject({
                shape: this.shapes[Math.floor(Math.random() * this.shapes.length)],
                position: position,
                color: hue
            });
            newAddedItems.push(newDroppingObject);
        }

        this.itemsOnScreen = this.itemsOnScreen.concat(...newAddedItems);
        return newAddedItems;
    }

    public updateGameState(): DroppingObject[] {
        if (this.itemsOnScreen.every((ios: DroppingObject) => !this.isItemOnScreen(ios))) {
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
        const activeObjects = this.itemsOnScreen.filter((ios: DroppingObject) => this.isItemOnScreen(ios));
        for (const object of activeObjects) {
            const nextPosition = Math.floor(Math.random() * 10);
            object.position.y += nextPosition;
        }
    }

    private cleanupItemsOnScreen(): void {
        const inActiveObjects = this.itemsOnScreen.filter((ios: DroppingObject) => !this.isItemOnScreen(ios) || ios.hit);
        for (const object of inActiveObjects) {
            if (!object.hit) {
                if (this.score.score > 0) {
                    this.score.score--;
                    this.score.lives--;
                } else {
                    this.score.lives = 0;
                }
            }
            this.itemsOnScreen.splice(this.itemsOnScreen.indexOf(object), 1);
        }
    }
}
