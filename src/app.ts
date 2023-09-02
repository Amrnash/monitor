import express, { Request, Response, NextFunction } from "express";
import { checkRouter } from "./routes/check";
import { reportRouter } from "./routes/report";
import { userRouter } from "./routes/user";
import { CustomError } from "./utils/custom-error";

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/report", reportRouter);
app.use("/check", checkRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.send(err.serializeError());
  } else {
    res
      .status(500)
      .send({ error: { message: "Something Went Wrong!", stack: err.stack } });
  }
});

export { app };
