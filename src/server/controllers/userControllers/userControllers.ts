import "../../../loadEnvironment.js";
import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import {
  type RegisterUserRequest,
  type UserCredentialsRequest,
} from "../../../types";
import User from "../../../database/models/User.js";
import { responseErrorData } from "../../../utils/responseData/responseData.js";

export const registerUser = async (
  req: RegisterUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password, surname, username } = req.body;

  try {
    const newUser = await User.create({
      email,
      name,
      surname,
      username,
      password: bcrypt.hash(password, 10),
    });

    res.status(201).json({ newUser });
  } catch (error: unknown) {
    next(error);
  }
};

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = responseErrorData.wrongCredentials;
      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "80d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
