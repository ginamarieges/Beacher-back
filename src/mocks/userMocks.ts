import { type UserInformation, type UserCredentials } from "../types";

export const mockedUserHashed: UserInformation = {
  username: "admin",
  password: "$2y$10$HMdnP7P4uOO4uPQPXW8lF.dJKyjBvOsXu.r9QQb5nWB9xD/d5o/p.",
  email: "fact@gmail.com",
  name: "admin",
  surname: "ser",
};

export const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwZGU1NzRkYTA5Mjk0Mzk1YTZlYWEiLCJuYW1lIjoiZ2luYSIsImlhdCI6MTY4NTU1NjkxNywiZXhwIjoxNjkyNDY4OTE3fQ.tytG1dDxJVic6GfylREE0wpI-aLgfVcY5b8KDUkAFOc";

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
