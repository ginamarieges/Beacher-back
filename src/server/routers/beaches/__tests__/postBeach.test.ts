import "../../../../loadEnvironment";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import User from "../../../../database/models/User.js";
import Beach from "../../../../database/models/Beach";
import { mockedUserHashed, tokenMock } from "../../../../mocks/userMocks.js";
import { app } from "../../../app/app";
import paths from "../../../paths/paths";

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
  await Beach.deleteMany();
});

describe("Given a POST/beaches endpoint", () => {
  beforeEach(async () => {
    await User.create(mockedUserHashed);
  });
  describe("When it receives a request with a beach data", () => {
    test("Then it should respond with status 201 and the new beach created", async () => {
      const expectedStatus = 201;
      const expectedProperty = "newBeach";
      const addedBeach = {
        image: "image.jpg",
        region: "Barcelona",
        town: "Barcelona",
        name: "fake beach",
      };

      const response = await request(app)
        .post(paths.beaches)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(addedBeach)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });

  describe("When it receives a beach data without a name", () => {
    test("Then it should respond with the error 400 and the message 'name is required'", async () => {
      const expectedStatus = 400;
      const expectedMessage = "name is required";
      const beach = {
        image: "image.jpg",
        region: "Barcelona",
        town: "Barcelona",
      };

      const response = await request(app)
        .post(paths.beaches)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(beach)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
