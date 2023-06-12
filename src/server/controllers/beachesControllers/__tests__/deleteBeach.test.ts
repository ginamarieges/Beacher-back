import { type NextFunction, type Response } from "express";
import { type AuthRequest } from "../../../../types";
import { deleteBeach } from "../beachesControllers";
import Beach from "../../../../database/models/Beach";
import CustomError from "../../../../CustomError/CustomError";
import { mockBeaches } from "../../../../mocks/beachesMocks";

beforeEach(() => {
  jest.clearAllMocks();
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
