import { type NextFunction, type Request, type Response } from "express";
import { generalError, notFoundError } from "./errorMiddlewares.js";
import CustomError from "../../../CustomError/CustomError.js";
import { responseErrorData } from "../../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives an error with status code 404 and message 'Not found'", () => {
    const error = new CustomError("Not found", 404);
    test("Then it should call the status method with the status code 404", () => {
      const expectedStatus = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the json method with the message 'Not found'", () => {
      const expectedMessage = "Not found";

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives an error without status code", () => {
    const error = new Error();
    test("Then it should call the method status with status code 500", () => {
      const expectedStatus = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the message 'General error'", () => {
      const expectedMessage = "General error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});

describe("Given a notFoundError middleware,", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next funtion with an error with status code 404 and message 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const expectedError = responseErrorData.endpointNotFound;

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
