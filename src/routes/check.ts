import { NextFunction, Request, Response, Router } from "express";
import { Check } from "../models/check";
import { requireAuth } from "../middlewares/requireAuth";
import {
  exractCheckFromBody,
  exractUpdateCheckFromBody,
} from "../utils/helpers";
import { BadRequestError } from "../utils/bad-request-error";

const checkRouter = Router();

checkRouter.get(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checks = await Check.findAll();
      res.send({ data: { checks } });
    } catch (error) {
      next(error);
    }
  }
);

checkRouter.get(
  "/:name",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkName = req.params.name as string;
      const check = await Check.findOne({ name: checkName });
      if (!check) {
        next(
          new BadRequestError("Could not find a check with the provided name")
        );
      }
      return res.send({ data: { check } });
    } catch (error) {
      next(error);
    }
  }
);

checkRouter.post(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const check = exractCheckFromBody(req.body);
      const checkExists = await Check.findOne({ name: check.name });
      if (checkExists)
        return next(new Error("A Check with this name already exists!"));

      const newCheck = new Check(check);
      await newCheck.save();
      return res.status(201).send({ message: "Check created!" });
    } catch (error) {
      next(error);
    }
  }
);

checkRouter.delete(
  "/:name",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.params.name as string;
      await Check.deleteOne({ name });
      return res.send({ message: "Check Deleted!" });
    } catch (error) {
      next(error);
    }
  }
);

checkRouter.put(
  "/:name",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.params.name as string;
      const update = exractUpdateCheckFromBody(req.body);
      await Check.updateOne({ name }, update);
      return res.send({ message: "Check Updated!" });
    } catch (error) {
      next(error);
    }
  }
);
export { checkRouter };
