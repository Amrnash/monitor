import { NextFunction, Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import { BadRequestError } from "../utils/bad-request-error";
import { NotAuthorziedError } from "../utils/not-authorized-error";
import { Context } from "../utils/context";
import { CreateUser, User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(new NotAuthorziedError());
    const currentUser = verify(token, process.env.JWT_SECRET!) as CreateUser;
    if (!currentUser) return next(new NotAuthorziedError());
    console.log(currentUser);
    //@ts-ignore
    if (!currentUser.verified) {
      return next(new BadRequestError("Please verify your account!"));
    }
    const context = {
      currentUser,
    };
    req.context = context;
    next();
  } catch (error) {
    next(error);
  }
};
