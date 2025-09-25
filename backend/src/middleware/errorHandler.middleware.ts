import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error.name, error.message);
    if (error instanceof CustomError) {
        return res.status(error.StatusCode).json({
            message: error.serialize().message
        });
    } else {
        return res.status(400).json({
            message: "Unhandled error. Something went wrong."
        });
    }


}