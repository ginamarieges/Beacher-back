import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  type UserData,
  type UserCredentials,
  type UserCredentialsRequest,
} from "../../../types";
import { loginUser } from "./userControllers";
import { Types } from "mongoose";
import User from "../../../database/models/User";
import { responseErrorData } from "../../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const usersCredentials: UserCredentials = {
    password: "alo",
    username: "palo",
  };
  const req: Partial<UserCredentialsRequest> = {
    body: usersCredentials,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockedUser: UserData = {
    _id: new Types.ObjectId().toString(),
    password: "alo",
    username: "palo",
  };

  const token = "El token";
  describe("When it receives a request with valid username and password", () => {
    test("Then it should call the status method with a status code 200", async () => {
      const expectedStatus = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedUser),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives an invalid username or password and the next function", () => {
    test("Then it should call the next function with the error 'Wrong credentials', and status code 401", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const expectedError = responseErrorData.wrongCredentials;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
