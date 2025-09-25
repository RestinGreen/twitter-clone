export abstract class CustomError extends Error {
    abstract StatusCode: number;

    constructor(public message: string) {
        super(message);
    }

    abstract serialize(): { message: string };
}