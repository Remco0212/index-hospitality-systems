import { Position } from "./position.model";

export class DroppingObject {
    public shape = "rect";
    public position: Position = new Position();
    public hit = false;
    public color = 0;

    constructor(data?: {
        shape: string;
        position: Position;
        color: number;
        hit?: boolean;
    }) {
        this.shape = data?.shape || "rect";
        this.position = data?.position || new Position();
        this.hit = data?.hit || false;
        this.color = data?.color || 0;
    }
}
