import { type Request } from "express";
import type * as core from "express-serve-static-core";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserInformation extends UserCredentials {
  name: string;
  surname: string;
  email: string;
}

export interface UserData extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type RegisterUserRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserInformation
>;

export interface BeachDataStructure {
  name: string;
  image: string;
  description: string;
  region: string;
  town: string;
  services: {
    showers: boolean;
    baywatch: boolean;
    umbrellas: boolean;
    dogsAllowed: boolean;
    restaurant: boolean;
    familyBeach: boolean;
    secretBeach: boolean;
  };
  addServices?: string;
  user?: string;
}

export interface BeachStructure extends BeachDataStructure {
  id?: string;
}
export interface BeachDocumentStructure extends BeachDataStructure {
  _id: Types.ObjectId;
}

export interface AuthRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

export interface CustomRequest extends Request {
  body: BeachDataStructure;
  userId: string;
}

export interface CustomUpdateRequest extends Request {
  body: BeachStructure;
  userId: string;
}
