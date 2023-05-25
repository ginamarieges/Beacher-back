import "../../../loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug(
  "beacher-api:server:middlewares:errorMiddlewares:errorMiddlewares.ts"
);

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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
  const customError = new CustomError("Endpoint not found", 404);
  next(customError);
};
