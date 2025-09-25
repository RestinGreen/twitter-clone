import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors/AuthenticationError";
import { ExpressRequestWithAuth, getAuth } from "@clerk/express"


export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  
  if (!userId) {
    throw new AuthenticationError("Unauthorized - you must be logged in");
  }
  next();
};