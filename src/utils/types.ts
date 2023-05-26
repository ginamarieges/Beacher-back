import type CustomError from "../CustomError/CustomError.js";

export interface ErrorStructure {
  endpointNotFound: CustomError;
  wrongCredentials: CustomError;
}
