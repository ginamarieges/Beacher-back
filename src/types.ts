import { type Request } from "express";
import type * as core from "express-serve-static-core";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface BeachStateStructure {
  name: string;
  image: string;
  description: string;
  region: string;
  town: string;
  services: {
    showers: boolean;
    lifeguard: boolean;
    umbrellas: boolean;
    dogsAllowed: boolean;
  };
  users: string;
}

export interface BeachStructure extends BeachStateStructure {
  id: string;
}
export interface BeachDocumentStructure extends BeachStateStructure {
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
