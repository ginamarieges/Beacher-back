import { type NextFunction, type Response } from "express";
import { getResponseBeachMock } from "../../../../mocks/factories/beachfactories";
import Beach from "../../../../database/models/Beach";
import { type CustomRequest } from "../../../../types";
import { addBeach } from "../beachesControllers";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a addBeach controller", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  const beachToAdd = getResponseBeachMock();
  const beachAdded = getResponseBeachMock();
  const userId = "646fc50910c8e8c5b17d54a7";

  const req: Partial<CustomRequest> = {
    userId,
    body: beachToAdd,
  };
  describe("When it receives a response and a beach data to add", () => {
    Beach.create = jest.fn().mockReturnValue(beachAdded);

    test("Then it should call the method status with a 201", async () => {
      const expectedStatus = 201;

      await addBeach(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the json method with the added beach", async () => {
      await addBeach(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ newBeach: beachAdded });
    });
  });

  describe("When it receives a next function and the create funtion rejects", () => {
    test("Then it should call the next fucntion with the error 400", async () => {
      const expectedError = new CustomError("Error adding your beach", 400);

      Beach.create = jest.fn().mockResolvedValue(null);

      await addBeach(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
