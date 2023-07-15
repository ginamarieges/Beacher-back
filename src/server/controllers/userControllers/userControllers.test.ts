import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  type UserData,
  type UserCredentials,
  type UserCredentialsRequest,
  type UserInformation,
  type RegisterUserRequest,
} from "../../../types";
import { loginUser, registerUser } from "./userControllers";
import { Types } from "mongoose";
import User from "../../../database/models/User";
import { responseErrorData } from "../../../utils/responseData/responseData";
import CustomError from "../../../CustomError/CustomError";

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

describe("Given a registerUser controller", () => {
  const userData: UserInformation = {
    email: "fina@gmail.com",
    name: "Juana",
    password: "dinamo",
    surname: "Perla",
    username: "juanita",
  };

  const req: Partial<RegisterUserRequest> = {
    body: userData,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const userAdded: UserInformation = {
    email: "fina@gmail.com",
    name: "Juana",
    password: "$2y$10$KiiI6RQjNehTOHoA3I3F2elAqCtIvOwwTULTN.KWCgz8pH.ppTIVK",
    surname: "Perla",
    username: "juanita",
  };
  describe("When it receives a request with valid user data", () => {
    test("Then it should call the status method with the code 201", async () => {
      const expectedStatus = 201;

      User.create = jest.fn().mockResolvedValue(userAdded);

      await registerUser(
        req as RegisterUserRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the json method with the juanita user added", async () => {
      User.create = jest.fn().mockResolvedValue(userAdded);

      await registerUser(
        req as RegisterUserRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ newUser: userAdded });
    });
  });

  describe("When it receives an invalid user data", () => {
    test("Then it should call the method next with the error 'Error in the register'", async () => {
      const expectedError = new CustomError("Error in the register", 404);

      User.create = jest.fn().mockResolvedValue(null);

      await registerUser(
        req as RegisterUserRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
