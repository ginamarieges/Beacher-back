import { type NextFunction, type Request, type Response } from "express";
import { getBeaches } from "./beachesControllers.js";
import Beach from "../../../database/models/Beach.js";
import { mockBeaches } from "../../../mocks/beachesMocks.js";
import { responseErrorData } from "../../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBeaches controllers", () => {
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
