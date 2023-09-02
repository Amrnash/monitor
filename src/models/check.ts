import { db } from "./db";
import { Filter, ObjectId } from "mongodb";
export interface CreateCheck {
  name: string;
  url: string;
  path?: string;
  port?: number;
  timeout: number;
  interval: number;
  threshold?: number;
  authentication?: {
    username: string;
    password: string;
  };
  httpHeaders?: any;
  user: ObjectId;
}

const checksCol = db.collection<CreateCheck>("Checks");
export class Check {
  constructor(public check: CreateCheck) {}

  static findAll(filter: Filter<CreateCheck>) {
    return checksCol.find(filter).toArray();
  }

  static findOne(filter: Filter<CreateCheck>) {
    return checksCol.findOne(filter);
  }

  static deleteOne(filter: Filter<CreateCheck>) {
    return checksCol.deleteOne(filter);
  }

  static updateOne(filter: Filter<CreateCheck>, update: Partial<CreateCheck>) {
    return checksCol.updateOne(filter, { $set: { ...update } });
  }
  save() {
    return checksCol.insertOne({ ...this.check });
  }
}
