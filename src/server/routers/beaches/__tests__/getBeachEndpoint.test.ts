import "../../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../../database/connectToDatabase.js";
import Beach from "../../../../database/models/Beach.js";
import { getBeachesMock } from "../../../../mocks/factories/beachfactories.js";
import mongoose from "mongoose";
import { tokenMock } from "../../../../mocks/userMocks.js";
import request from "supertest";
import { app } from "../../../app/app.js";

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
  await Beach.deleteMany();
});

const beachesList = getBeachesMock(3);

describe("Given a GET/beaches/:id endpoint", () => {
  beforeEach(async () => {
    await Beach.create(beachesList);
  });

  describe("When it receives a request with a valid id", () => {
    test("Then it should respond with status 200 and the beach", async () => {
      const expectedStatus = 200;
      const property = "beach";
      const beach = await Beach.find().exec();

      const response = await request(app)
        .get(`/beaches/${beach[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(property);
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with an error with status code 404 and the message 'Beach not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Beach not found";
      const beachId = "64874d6ffa8ea2d9c2998c33";

      const response = await request(app)
        .get(`/beaches/${beachId}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
