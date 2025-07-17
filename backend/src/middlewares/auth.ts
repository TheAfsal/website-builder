import { expressjwt } from "express-jwt";
import Express from "express";
import dotenv from "dotenv";
dotenv.config();

const getTokenFromCookie = (req: Express.Request): string | undefined => {
  return req.cookies["builder-id"] || undefined;
};

console.log(process.env.JWT_SECRET);

const authMiddleware = expressjwt({
  secret: process.env.JWT_SECRET || "my_secret",
  algorithms: ["HS256"],
  getToken: getTokenFromCookie,
}).unless({
  path: ["/api/users/register", "/api/users/login"],
});

export { authMiddleware, getTokenFromCookie };
