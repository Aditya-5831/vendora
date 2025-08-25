import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { userId: string };
}

interface TokenPayload extends JwtPayload {
  userId: string;
}

const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    if (!decoded || !decoded.userId) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = { userId: decoded.userId };

    next();
  } catch (error: Error | any) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
