import express, { Request, Response } from "express";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express 🚀");
});

app.get("/db", (req: Request, res: Response) => {
  res.send("OK");
});

app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});
