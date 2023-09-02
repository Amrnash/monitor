import { NextFunction, Request, Response, Router } from "express";
import { PollResult } from "../models/poll-result";
import { Check } from "../models/check";
import { BadRequestError } from "../utils/bad-request-error";
import { NotAuthorziedError } from "../utils/not-authorized-error";
import { requireAuth } from "../middlewares/requireAuth";

const reportRouter = Router();

reportRouter.get(
  "/:name",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name as string;
    const results = await PollResult.findMany({ name });

    console.log(results);
    // find a check with the provided name
    const check = await Check.findOne({ name });
    if (!check) next(new BadRequestError("No check matches this name!"));

    // check if user owns this check
    if (!(check?.user === req.context.currentUser._id)) {
      return next(new NotAuthorziedError());
    }
    results.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let totalUpTime = 0;
    let totalDownTime = 0;
    let t1 = 0,
      t2 = 0;
    while (t1 < results.length) {
      // Find the last timestamp with the same state
      while (
        results[t2] &&
        results[t2].isAvailable === results[t1].isAvailable
      ) {
        t2++;
      }
      // Aggregate the inteval
      if (!results[t2]) break;
      const timestamp1 = new Date(results[t1].date).getTime();
      const timestamp2 = new Date(results[t2].date).getTime();
      if (results[t1].isAvailable) {
        totalUpTime += timestamp2 - timestamp1;
      } else {
        totalDownTime += timestamp2 - timestamp1;
      }

      // Reset
      t1 = t2;
    }

    let numOfSuccesses = 0;
    let sumOfResponseTimes = 0;
    let outages = 0;
    for (const result of results) {
      if (result.isAvailable) {
        numOfSuccesses++;
        sumOfResponseTimes += result.responseTime;
      } else {
        outages++;
      }
    }

    const report = {
      availability: `${Math.round(
        (totalUpTime * 100) / (totalUpTime + totalDownTime)
      )}%`,
      outages,
      upTime: `${new Date(totalUpTime).getSeconds()} seconds`,
      downTime: `${new Date(totalDownTime).getSeconds()} seconds`,
      responseTime: `${(sumOfResponseTimes / numOfSuccesses / 1000).toFixed(
        5
      )} seconds`,
    };

    return res.send({ data: { report } });
  }
);

export { reportRouter };
