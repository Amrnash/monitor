import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models/user";
import { genSalt, hash, compare } from "bcryptjs";
import { BadRequestError } from "../errors/bad-request-error";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Notification } from "../channels/notification";
import { EmailSender } from "../channels/email-channel";

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
      const uuid = uuidv4();
      const newUser = {
        name,
        email,
        password: hashedPassword,
        verified: false,
        verificationId: uuid,
      };

      const notification = new Notification(new EmailSender());
      notification.sendNotification(email, uuid); // currently not working

      const user = await new User(newUser).save();
      const token = sign(user, process.env.JWT_SECRET!);
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
    user.verified = true;
    const token = sign(user, process.env.JWT_SECRET!);
    return res.send({ data: { token } });
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
