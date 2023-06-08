import "../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request, { type Response } from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import Beach from "../../../database/models/Beach.js";
import User from "../../../database/models/User.js";
import { mockedUserHashed, tokenMock } from "../../../mocks/userMocks.js";
import { beaches, mockedBeaches } from "../../../mocks/beachesMocks.js";
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
  await Beach.deleteMany();
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
