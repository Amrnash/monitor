import { CreateCheck } from "../models/check";

export function exractUpdateCheckFromBody(body: any) {
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
  } = body as Partial<CreateCheck>;
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
  const filteredCheck: Partial<CreateCheck> = {};
  for (const key in check) {
    if (check[key as keyof typeof check]) {
      filteredCheck[key as keyof CreateCheck] =
        check[key as keyof typeof check];
    }
  }
  return filteredCheck;
}
