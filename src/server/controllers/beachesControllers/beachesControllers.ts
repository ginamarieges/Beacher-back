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
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
    { page: string; region: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { region } = req.query;

    let beachFilter = {};

    if (region) {
      beachFilter = { region };
    }

    const pageSize = 5;
    const skip = (Number(req.query.page) - 1) * pageSize;

    const beaches = await Beach.find(beachFilter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const length = await Beach.where(beachFilter).countDocuments();

    res.status(200).json({ beaches, length });
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

export const getBeach = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const beach = await Beach.findOne({ _id: id }).exec();

    if (!beach) {
      throw responseErrorData.beachNotFound;
    }

    res.status(200).json({ beach });
  } catch (error: unknown) {
    next(error);
  }
};
