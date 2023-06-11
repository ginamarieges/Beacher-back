import { type NextFunction, type Request, type Response } from "express";
import Beach from "../../../../database/models/Beach.js";
import { mockBeaches } from "../../../../mocks/beachesMocks";
import { filterBeaches } from "../beachesControllers";
import { responseErrorData } from "../../../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a filterBeaches controller", () => {
  const regionToFilter = "Maresme";

  const req: Partial<Request> = {
    query: {
      region: regionToFilter,
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a response and 'Maresme'", () => {
    Beach.find = jest.fn().mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue(
          mockBeaches.filter((beach) => beach.region.includes(regionToFilter))
        ),
    });
    test("Then it should return one beach with the region property Maresme", async () => {
      const expectedBeaches = [mockBeaches[0]];

      await filterBeaches(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
          { region: string }
        >,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ beaches: expectedBeaches });
    });

    test("Then it should call the method status with 200", async () => {
      const expectedStatus = 200;

      await filterBeaches(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
          { region: string }
        >,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it rejects and receives a next function", () => {
    test("Then it should call the next function with the error 'Server error'", async () => {
      const expectedError = responseErrorData.serverError;

      Beach.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await filterBeaches(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
          { region: string }
        >,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
