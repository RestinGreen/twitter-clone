import { CustomError } from "../utils/CustomError";

export class OtherError extends CustomError {

    StatusCode = 400;
    
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, OtherError.prototype);
    }
    serialize(): { message: string } {
        return { message: this.message };
    }
}