import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

interface CustomRequest extends Request {
  isAuth?: boolean;
  isAdmin?: boolean;
  userId?: string;
}

export const admin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuth && req.userId) {
    const user = await User.findById(req.userId);
    if (user && user.isAdmin) {
      req.isAdmin = true;
    }
  }
  req.isAdmin = false;
  next();
};
