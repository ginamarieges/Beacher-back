import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../../database/connectToDatabase";
import mongoose from "mongoose";
import User from "../../../../database/models/User";
import Beach from "../../../../database/models/Beach";
import { mockBeaches } from "../../../../mocks/beachesMocks";
import { mockedUserHashed, tokenMock } from "../../../../mocks/userMocks";
import { app } from "../../../app/app";
import paths from "../../../paths/paths";
import { type BeachStructure } from "../../../../types";

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

describe("Given a PUT/beaches endpoint", () => {
  beforeEach(async () => {
    await User.create(mockedUserHashed);
    await Beach.create(mockBeaches);
  });
  describe("When it receives a request with a beach data", () => {
    test("Then it should return status 200 and the message 'Beach updated'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Beach updated";
      const beachData: Partial<BeachStructure> = {
        id: "647c95dd41a0463b7c0461a1",
      };

      const response = await request(app)
        .put(paths.beaches)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(beachData)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should return status 404 and the message 'Beach not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Beach not found";

      const response = await request(app)
        .put(paths.beaches)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
