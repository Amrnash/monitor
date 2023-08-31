import { NextFunction, Request, Response } from "express";
import { app } from "./app";

require("dotenv").config();
const PORT = process.env.PORT;

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  console.log("testing...");
  res.send({});
});
app.listen(PORT, () => {
  // poll();
  console.log(`Server is running on ${PORT}`);
});
