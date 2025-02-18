import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userService } from "../services";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.findUserByUsername(username);
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user?.password!);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user?.id, username: user?.username }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    res.status(400).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const userId = (decoded as { id: number }).id;

    const user = await userService.findUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
