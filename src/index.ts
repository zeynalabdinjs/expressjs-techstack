import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express and Prisma!");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
