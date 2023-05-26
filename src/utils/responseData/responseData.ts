import CustomError from "../../CustomError/CustomError.js";
import { type ErrorStructure } from "./types.js";

export const responseErrorData: ErrorStructure = {
  wrongCredentials: new CustomError("Wrong credentials", 401),
  endpointNotFound: new CustomError("Endpoint not found", 404),
  serverError: new Error("Server error"),
  tokenNotFound: new CustomError("Token not found", 401),
};
