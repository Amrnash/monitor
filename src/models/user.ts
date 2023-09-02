import { db } from "./db";
import { Filter, ObjectId, WithId } from "mongodb";
export interface CreateUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  verificationId: string | null;
}

const usersCol = db.collection<CreateUser>("Users");
export class User {
  constructor(public user: CreateUser) {}

  static findMany(filter: Filter<CreateUser> | undefined) {
    if (filter) return usersCol.find(filter).toArray();
    return usersCol.find().toArray();
  }

  static findOne(filter: Filter<CreateUser>) {
    return usersCol.findOne(filter);
  }

  static deleteOne(filter: Filter<CreateUser>) {
    return usersCol.deleteOne(filter);
  }

  static updateOne(filter: Filter<CreateUser>, update: Partial<CreateUser>) {
    return usersCol.updateOne(filter, { $set: { ...update } });
  }
  async save() {
    await usersCol.insertOne({ ...this.user });
    return this.user as WithId<CreateUser>;
  }
}
