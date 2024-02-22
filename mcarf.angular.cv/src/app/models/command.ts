import { CommandType } from "../enums/command-type";

export class Command {
    public input: string;
    public output: string;
    public type: CommandType;
    
    constructor(input: string, output: string, type: CommandType = CommandType.ACCENT) {
        this.input = input;
        this.output = output;
        this.type = type;
    }
}