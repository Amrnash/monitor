import { db } from "./db";
import { Filter, WithId } from "mongodb";
export interface CreatePollResult {
  name: string;
  isAvailable: boolean;
  responseTime: number;
  date: Date;
}

const resultsCol = db.collection<CreatePollResult>("PollResults");
export class PollResult {
  constructor(public result: CreatePollResult) {}

  static findMany(filter: Filter<CreatePollResult> | undefined) {
    if (filter) return resultsCol.find(filter).toArray();
    return resultsCol.find().toArray();
  }

  static findOne(filter: Filter<CreatePollResult>) {
    return resultsCol.findOne(filter);
  }

  static deleteOne(filter: Filter<CreatePollResult>) {
    return resultsCol.deleteOne(filter);
  }

  static updateOne(
    filter: Filter<CreatePollResult>,
    update: Partial<CreatePollResult>
  ) {
    return resultsCol.updateOne(filter, { $set: { ...update } });
  }
  async save() {
    await resultsCol.insertOne({ ...this.result });
    return this.result as WithId<CreatePollResult>;
  }
}
