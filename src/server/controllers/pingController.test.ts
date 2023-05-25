import { type Request, type Response } from "express";
import { pingController } from "./pingController.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a pingController controller", () => {
  describe("When it receives a request", () => {
    const req = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the method status with a 200", () => {
      const expectedStatus = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the message 'Pong 🏓'", () => {
      const expectedMessage = "Pong 🏓";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
