import { MongoMemoryServer } from "mongodb-memory-server";
import request, { type Response } from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import Beach from "../../../database/models/Beach.js";
import User from "../../../database/models/User.js";
import { mockedUserHashed, tokenMock } from "../../../mocks/userMocks.js";
import { mockedBeaches } from "../../../mocks/beachesMocks.js";
import paths from "../../paths/paths.js";
import { app } from "../../app/app.js";

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

describe("Given a GET/beaches endpoint", () => {
  beforeEach(async () => {
    await User.create(mockedUserHashed);
    await Beach.create(mockedBeaches);
  });
  describe("When it receives a request with a valid token in the header", () => {
    test("Then it should respond with a status code 200 and a list of 4 beaches", async () => {
      const expectedStatus = 200;

      const response = await request(app)
        .get(paths.beaches)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.beaches).toHaveLength(4);
    });
  });

  describe("When it receives a request without a token", () => {
    test("Then it should respond with the error 401 and the message 'Token not found'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Token not found";
      const response: Response = await request(app)
        .get(paths.beaches)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
