import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  isAuth?: boolean;
  userId?: string;
}

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    const JWTSECRET = process.env.JWTSECRET!;
    jwt.verify(token, JWTSECRET, (err, decoded) => {
      if (err) {
        req.isAuth = false;
      }
      const decodedPayload = decoded as MyJwtPayload;
      req.isAuth = true;
      req.userId = decodedPayload.userId;
    });
  }
  req.isAuth = false;
  next();
};
