import { CreateCheck } from "../models/check";

export function exractCheckFromBody(body: any) {
  const {
    interval,
    name,
    timeout,
    url,
    authentication,
    httpHeaders,
    path,
    port,
    threshold,
  } = body as CreateCheck;
  const check = {
    interval,
    name,
    timeout,
    url,
    authentication,
    httpHeaders,
    path,
    port,
    threshold,
  };
  return check;
}
