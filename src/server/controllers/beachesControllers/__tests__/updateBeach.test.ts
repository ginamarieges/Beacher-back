import { type NextFunction, type Response } from "express";
import { type CustomUpdateRequest } from "../../../../types";
import { updateBeach } from "../beachesControllers";
import { getResponseBeachMock } from "../../../../mocks/factories/beachfactories";
import Beach from "../../../../database/models/Beach";
import { responseErrorData } from "../../../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an updateBeach controller", () => {
  const userId = "646fc50910c8e8c5b17d54a7";
  const beachToUpdate = getResponseBeachMock({
    id: "648f016a779ab76681dfea75",
  });
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  const req: Partial<CustomUpdateRequest> = {
    userId,
    body: beachToUpdate,
  };
  describe("When it receives a response and a beach data to update", () => {
    Beach.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(beachToUpdate) });

    test("Then it should call the status method with a 200", async () => {
      const expectedStatus = 200;

      await updateBeach(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the message 'Beach updated'", async () => {
      const expectedMessage = "Beach updated";

      await updateBeach(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When it receives a next function and an invalid beach", () => {
    test("Then it should call the next function with the error 'Beach not found'", async () => {
      const expectedError = responseErrorData.beachNotFound;

      Beach.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(null),
      });

      await updateBeach(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
