import { type NextFunction, type Request, type Response } from "express";
import { getBeaches } from "../beachesControllers";
import Beach from "../../../../database/models/Beach";
import { responseErrorData } from "../../../../utils/responseData/responseData";
import { mockBeaches } from "../../../../mocks/beachesMocks";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBeaches controller", () => {
  const req: Partial<Request> = {
    query: {
      page: "10",
      region: "Maresme",
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a response", () => {
    Beach.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockBeaches),
          }),
        }),
      }),
    });
    Beach.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBeaches.length),
      }),
    });
    test("Then it should call the method status 200", async () => {
      const expectedStatus = 200;

      await getBeaches(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
          { page: string; region: string }
        >,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with a list of two beaches", async () => {
      const expectedBeaches = {
        beaches: mockBeaches,
        length: mockBeaches.length,
      };

      await getBeaches(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
          { page: string; region: string }
        >,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedBeaches);
    });
  });

  describe("When it rejects and receives a next function", () => {
    test("Then it should call the next function with the error 'Server error'", async () => {
      const error = responseErrorData.serverError;

      Beach.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockRejectedValue(error),
            }),
          }),
        }),
      });

      await getBeaches(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
          { page: string; region: string }
        >,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
