export class Spinner {
    public name: string;
    public interval: number;
    public frames: string[];

    constructor(name: string, interval: number, frames: string[]) {
        this.name = name;
        this.interval = interval;
        this.frames = frames;
    }
}