import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import { responseErrorData } from "../../../utils/responseData/responseData.js";
import { type AuthRequest } from "../../../types";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader?.includes("Bearer")) {
      const customError = responseErrorData.tokenNotFound;
      throw customError;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? responseErrorData.invalidToken
        : error;
    next(customError);
  }
};

export default auth;
