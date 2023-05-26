import CustomError from "../../CustomError/CustomError.js";
import { type ErrorStructure } from "./types.js";

export const responseErrorData: ErrorStructure = {
  wrongCredentials: new CustomError("Wrong credentials", 401),
  endpointNotFound: new CustomError("Endpoint not found", 404),
};