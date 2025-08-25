import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

type AccessPayload = { userId: string; email?: string };
type RefreshPayload = { userId: string };

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_SECRET) as AccessPayload & JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshPayload & JwtPayload;
};
