import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DroppingObject } from "../models/dropping-object.model";

@Component({
    selector: "app-dropping-object",
    templateUrl: "./dropping-object.component.html",
    styleUrls: ["./dropping-object.component.scss"]
})
export class DroppingObjectComponent {
    @Input() public droppingObject: DroppingObject = new DroppingObject();
    @Output()
    public droppingObjectClicked: EventEmitter<void> = new EventEmitter<void>();
    constructor() {}

    public getStyle(): {
        left: string;
        top: string;
        backgroundColor: string;
        borderBottomColor: string;
    } {
        const styles = {
            left: `${this.droppingObject.position.x}px`,
            top: `${this.droppingObject.position.y}px`,
            backgroundColor:
                this.droppingObject.shape !== "triangle"
                    ? `hsla(${this.droppingObject.color}, 60%, 85%, 1)`
                    : "",
            borderBottomColor:
                this.droppingObject.shape === "triangle"
                    ? `hsla(${this.droppingObject.color}, 60%, 85%, 1)`
                    : ""
        };
        return styles;
    }

    public clicked(): void {
        this.droppingObjectClicked.emit();
    }
}
