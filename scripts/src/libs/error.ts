import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export function extractErorMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return fromZodError(error).message + "\n" + error.issues.map((issue) => issue.message).join("\n");
  }
  if (error instanceof Error) {
    return error.message + "\n" + error.stack;
  }

  return String(error);
}