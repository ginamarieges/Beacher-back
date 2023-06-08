import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import Beach from "../../../database/models/Beach.js";
import { responseErrorData } from "../../../utils/responseData/responseData.js";
import { type CustomRequest } from "../../../types.js";
import { Types } from "mongoose";

const debug = createDebug(
  "beacher-api:server:controllers:beachesControllers:beachesControllers.js"
);

export const getBeaches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const beaches = await Beach.find().limit(10).exec();
    res.status(200).json({ beaches });
  } catch (error) {
    const customError = responseErrorData.serverError;
    debug(error.message);
    next(customError);
  }
};

export const deleteBeach = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const beachToDelete = await Beach.findByIdAndDelete(id).exec();

    if (!beachToDelete) {
      throw responseErrorData.beachNotFound;
    }

    res.status(200).json({ message: `Beach deleted` });
  } catch (error: unknown) {
    next(error);
  }
};

export const addBeach = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;

  try {
    const newBeach = await Beach.create({
      ...body,
      user: new Types.ObjectId(userId),
    });

    if (!newBeach) {
      throw responseErrorData.errorAddBeach;
    }

    res.status(201).json({ newBeach });
  } catch (error: unknown) {
    next(error);
  }
};
