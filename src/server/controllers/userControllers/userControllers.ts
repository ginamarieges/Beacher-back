import "../../../loadEnvironment.js";
import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../../types";
import User from "../../../database/models/User";
import CustomError from "../../../CustomError/CustomError";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(user.password, password))) {
      const customError = new CustomError("Wrong credentials", 401);
      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
