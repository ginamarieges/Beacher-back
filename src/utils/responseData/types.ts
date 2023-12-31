import type CustomError from "../../CustomError/CustomError.js";

export interface ErrorStructure {
  endpointNotFound: CustomError;
  wrongCredentials: CustomError;
  serverError: Error;
  tokenNotFound: CustomError;
  invalidToken: CustomError;
  beachNotFound: CustomError;
  errorAddBeach: CustomError;
  errorRegisterUser: CustomError;
}
