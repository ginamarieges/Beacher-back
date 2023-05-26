import { type UserCredentials } from "../types";

export const mockedUserHashed: UserCredentials = {
  username: "admin",
  password: "$2y$10$HMdnP7P4uOO4uPQPXW8lF.dJKyjBvOsXu.r9QQb5nWB9xD/d5o/p.",
};

export const mockedUser: UserCredentials = {
  username: "admin",
  password: "holaAdmin",
};

export const invalidMockedUser: UserCredentials = {
  username: "admins",
  password: "holaAdmin",
};

export const mockedUserWithoutPassword = {
  username: "admin",
};
