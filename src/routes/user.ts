import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models/user";
import { genSalt, hash, compare } from "bcryptjs";
import { BadRequestError } from "../utils/bad-request-error";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const userRouter = Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return next(new BadRequestError("Email already exists"));
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        verified: false,
        verificationId: uuidv4(),
      };
      const user = await new User(newUser).save();
      const token = sign({ user }, process.env.JWT_SECRET!);
      return res.send({ data: { token } });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    const { verificationId } = req.body;
    const user = await User.findOne({ verificationId });
    if (!user) return next(new BadRequestError("Invalid verification id"));
    await User.updateOne({ _id: user._id }, { verified: true });
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) return next(new BadRequestError("Wrong Credentials"));
      const isValidPassword = await compare(password, existingUser.password);
      if (!isValidPassword)
        return next(new BadRequestError("Wrong Credentials"));

      const token = sign({ existingUser }, process.env.JWT_SECRET!);
      return res.send({ data: { token } });
    } catch (error) {
      next(error);
    }
  }
);
export { userRouter };
