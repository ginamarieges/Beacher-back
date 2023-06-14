import "../../../../loadEnvironment";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import User from "../../../../database/models/User.js";
import Beach from "../../../../database/models/Beach";
import { mockedUserHashed, tokenMock } from "../../../../mocks/userMocks.js";
import { beaches } from "../../../../mocks/beachesMocks";
import { app } from "../../../app/app";

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

describe("Given a DELETE/beaches/delete/:id endpoint", () => {
  beforeEach(async () => {
    await User.create(mockedUserHashed);
    await Beach.create(beaches);
  });
  describe("When it receives a request with an id of an existing beach", () => {
    test("Then it should respond with status 200 and a messege 'Beach deleted'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Beach deleted";
      const beachId = "647c95dd41a0463b7c0461a1";

      const response = await request(app)
        .delete(`/beaches/delete/${beachId}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with the error 404 and the message Beach not found", async () => {
      const expectedMessage = "Beach not found";
      const expectedStatus = 404;
      const id = "5fbd2a81f4b3c96d54d32c9a";

      const response = await request(app)
        .delete(`/beaches/delete/${id}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
