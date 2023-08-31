import express, { Request, Response, NextFunction } from "express";
import { checkRouter } from "./routes/check";

const app = express();
app.use(express.json());
app.use("/check", checkRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});

export { app };
