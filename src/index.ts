import express, { Request, Response } from "express";
import { authRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express and Prisma!");
});

// AUTH ROUTING
app.use("/auth", authRoutes);
// AUTH ROUTING

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
