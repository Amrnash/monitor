import { JwtPayload } from "jsonwebtoken";

export interface Context {
  currentUser: JwtPayload | string;
}
