import { db } from "./db";

export interface CreateCheck {
  name: string;
  url: string;
  path?: string;
  port?: string;
  timeout: number;
  interval: number;
  threshold?: number;
  authentication?: {
    username: string;
    password: string;
  };
  httpHeaders?: any;
}
type Filter = { [k in keyof CreateCheck]?: CreateCheck[keyof CreateCheck] };

const checksCol = db.collection<CreateCheck>("Checks");
export class Check {
  constructor(public check: CreateCheck) {}

  static findAll() {
    return checksCol.find().toArray();
  }

  static findOne(filter: Filter) {
    return checksCol.findOne(filter);
  }

  static deleteOne(filter: Filter) {
    return checksCol.deleteOne(filter);
  }

  static updateOne(filter: Filter, update: Partial<CreateCheck>) {
    return checksCol.updateOne(filter, { $set: { ...update } });
  }
  save() {
    return checksCol.insertOne({ ...this.check });
  }
}
