import { type NextFunction, type Request, type Response } from "express";
import { deleteBeach, getBeaches } from "./beachesControllers.js";
import Beach from "../../../database/models/Beach.js";
import { mockBeaches } from "../../../mocks/beachesMocks.js";
import { responseErrorData } from "../../../utils/responseData/responseData.js";
import { type AuthRequest } from "../../../types.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBeaches controller", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a response", () => {
    Beach.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockBeaches),
    });
    test("Then it should call the method status 200", async () => {
      const expectedStatus = 200;

      await getBeaches(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with a list of two beaches", async () => {
      const expectedBeaches = { beaches: mockBeaches };

      await getBeaches(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(expectedBeaches);
    });
  });

  describe("When it rejects and receives a next function", () => {
    test("Then it should call the next function with the error 'Server error'", async () => {
      const error = responseErrorData.serverError;

      Beach.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getBeaches(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deleteBeach controller", () => {
  describe("When it receives a response and the beach to delete exists", () => {
    const req: Partial<AuthRequest> = {
      params: { id: mockBeaches[0]._id.toString() },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    Beach.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockBeaches),
    });

    test("Then it should call the method status with a 200", async () => {
      const expectedStatus = 200;

      await deleteBeach(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the message 'Beach deleted'", async () => {
      const expectedMessage = "Beach deleted";

      await deleteBeach(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a response and the beach doesn't exist", () => {
    test("Then it should call the next function with the error 'Beach not found'", async () => {
      const req: Partial<AuthRequest> = {
        params: { id: "233" },
      };

      const res = {};
      const next = jest.fn();

      const error = new CustomError("Beach not found", 404);

      Beach.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteBeach(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
