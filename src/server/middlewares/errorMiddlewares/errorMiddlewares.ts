import "../../../loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError.js";
import { responseErrorData } from "../../../utils/responseData/responseData.js";

const debug = createDebug(
  "beacher-api:server:middlewares:errorMiddlewares:errorMiddlewares.ts"
);

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body
      .map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll("'", "");

    (error as CustomError).publicMessage = validationError;
    debug(chalk.red(validationError));
  }

  debug(chalk.red(error.message));

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "General error";

  res.status(statusCode).json({ message });
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = responseErrorData.endpointNotFound;
  next(customError);
};
