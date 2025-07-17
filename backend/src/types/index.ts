import express from "express";

interface AuthRequest extends express.Request {
  auth?: {
    userId: string;
  };
}

export type { AuthRequest };
