export interface Command {
    name: string;
    description: string;
    run: Function;
}