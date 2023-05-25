import request from "supertest";
import { app } from "./app";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a response with status code 200 and the message 'Pong 🏓'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Pong 🏓";

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
