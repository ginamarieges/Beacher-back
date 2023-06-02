import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware";
import { type AuthRequest } from "../../../types";
import { responseErrorData } from "../../../utils/responseData/responseData";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwZGU1NzRkYTA5Mjk0Mzk1YTZlYWEiLCJuYW1lIjoiZ2luYSIsImlhdCI6MTY4NTU1NjkxNywiZXhwIjoxNjkyNDY4OTE3fQ.tytG1dDxJVic6GfylREE0wpI-aLgfVcY5b8KDUkAFOc";

  const res = {};
  const next = jest.fn();
  describe("When it receives a resquest with a Authorization header and a next function with a valid token", () => {
    test("Then it should call the next function", () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      auth(req as AuthRequest, res as Response, next as NextFunction);

      jwt.verify = jest.fn();

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with an invalid token and a next function", () => {
    test("Then it should call the next function with the error 'Invalid token' and the status code 401", () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      const expectedError = responseErrorData.invalidToken;

      expectedError.name = "JsonWebTokenError";

      auth(req as AuthRequest, res as Response, next as NextFunction);

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request without 'Bearer' and a next function", () => {
    test("Then it should call the next function with the error 'Token not found' and the status code 401", () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue(token),
      };

      const expectedError = responseErrorData.invalidToken;

      auth(req as AuthRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
