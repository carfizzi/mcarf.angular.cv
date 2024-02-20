import { CommandType } from "../enums/command-type";

export class Command {
    public input: string;
    public output: string;
    public type: CommandType = CommandType.ACCENT;
    
    constructor(input: string, output: string) {
        this.input = input;
        this.output = output;
    }
}