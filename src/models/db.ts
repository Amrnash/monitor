import { MongoClient } from "mongodb";
require("dotenv").config();

const URI = process.env.MONGO_URI!;
const client = new MongoClient(URI);
client.connect();
export const db = client.db("monitor");
