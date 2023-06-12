import { type NextFunction, type Request, type Response } from "express";
import Beach from "../../../../database/models/Beach";
import { getBeach } from "../beachesControllers";
import { responseErrorData } from "../../../../utils/responseData/responseData";
import { beachMock } from "../../../../mocks/beachesMocks";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBeach controller", () => {
  const req: Partial<Request> = {
    params: { id: "647c95dd41a0463b7c0461a1" },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a response and the id '647c95dd41a0463b7c0461a1'", () => {
    const expectedBeach = { beach: [beachMock] };

    Beach.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([beachMock]),
    });
    test("Then it should call the method json with the beach with the id '647c95dd41a0463b7c0461a1'", async () => {
      await getBeach(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedBeach);
    });

    test("Then it should call the method status with a 200", async () => {
      const expectedStatus = 200;

      await getBeach(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response and the beach doesn't exist", () => {
    test("Then it should call the next function with the error 'Beach not found'", async () => {
      const error = responseErrorData.beachNotFound;

      Beach.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getBeach(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
