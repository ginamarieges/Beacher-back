import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { app } from "../../app/app";
import paths from "../../paths/paths";
import connectToDatabase from "../../../database/connectToDatabase";
import User from "../../../database/models/User";
import {
  invalidMockedUser,
  mockedUser,
  mockedUserHashed,
  mockedUserWithoutPassword,
} from "../../../mocks/userMocks";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given an endpoint POST '/user/login'", () => {
  beforeEach(async () => {
    await User.create(mockedUserHashed);
  });

  describe("When it receives a request with valid username and password", () => {
    test("Then it shoud respond with a response with status code 200 and a token", async () => {
      const expectedStatus = 200;

      const newUser = await User.findOne({
        username: mockedUser.username,
      }).exec();

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockedUser)
        .expect(expectedStatus);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub as string;

      expect(userId).toStrictEqual(newUser?._id.toString());
    });
  });

  describe("When it receives an invalid username", () => {
    test("Then it shoud respond with a response with status code 401 and the message Wrong credentials", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong credentials";

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(invalidMockedUser)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request without a password", () => {
    test("Then it should respond with a response with status 400 and message 'password is required'", async () => {
      const expectedStatus = 400;
      const expectedMessage = "password is required";

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockedUserWithoutPassword)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
