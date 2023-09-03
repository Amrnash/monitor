export abstract class CustomError extends Error {
  abstract serializeError(): { error: { message: string; status: number } };
}
