import type { Request, Response } from "express";
import * as userService from "../services/userService.ts";
import type { AuthRequest } from "../types/index.ts";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.registerUser(email, password);
    res.cookie("builder-id", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600000,
    });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.cookie("builder-id", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600000,
    });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const verifyToken = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.verifyUser(req.auth?.userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Verify token error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("builder-id", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
