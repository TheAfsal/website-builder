import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.ts";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "my_secret",
    {
      expiresIn: "1h",
    }
  );
  return { user: { id: user._id, email: user.email }, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "my_secret",
    {
      expiresIn: "1h",
    }
  );
  return { user: { id: user._id, email: user.email }, token };
};

export const verifyUser = async (userId?: string) => {
  if (!userId) {
    throw new Error("User ID not provided");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { id: user._id, email: user.email };
};
