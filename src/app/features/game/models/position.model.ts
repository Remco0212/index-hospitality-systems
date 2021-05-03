export class Position {
    public x = 0;
    public y = 0;

    constructor(data?: { x: number }) {
        this.x = data?.x || 0;
    }
}
