import { db } from "./db";
import { Filter } from "mongodb";

type Status = "available" | "down";
export interface CreateReport {
  status: Status;
  avaialability: number;
  avgOutages: number;
  avgDonwTime: number;
  avgUpTime: number;
  avgResponseTime: number;
  history: {
    isAvailable: boolean;
    responseTime?: number;
    date: Date;
  }[];
}

const reportsCol = db.collection<CreateReport>("Reports");
export class Report {
  constructor(public report: CreateReport) {}

  static findAll() {
    return reportsCol.find().toArray();
  }

  static findOne(filter: Filter<CreateReport>) {
    return reportsCol.findOne(filter);
  }

  static deleteOne(filter: Filter<CreateReport>) {
    return reportsCol.deleteOne(filter);
  }

  static updateOne(
    filter: Filter<CreateReport>,
    update: Partial<CreateReport>
  ) {
    return reportsCol.updateOne(filter, { $set: { ...update } });
  }
  save() {
    return reportsCol.insertOne({ ...this.report });
  }
}
