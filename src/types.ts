import { type Request } from "express";
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
