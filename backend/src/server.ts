import express, { Request, Response } from "express";
import { ExpressAuth } from "@auth/express";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import cors from "cors";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { join } from "path";
import { readFileSync } from "fs";
import {clerkMiddleware} from "@clerk/express"

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  const landingPagePath = join(process.cwd(), "src", "landingPage.html");
  const html = readFileSync(landingPagePath, "utf8");
  res.status(200).send(html);
});


app.use(errorHandler)

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`Server running on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();

