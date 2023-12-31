import "../../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddlewares/errorMiddlewares.js";
import { pingController } from "../controllers/pingController/pingController.js";
import paths from "../paths/paths.js";
import userRouter from "../routers/users/userRouter.js";
import auth from "../middlewares/authMiddleware/authMiddleware.js";
import beachesRouter from "../routers/beaches/beachesRouter.js";
import bodyParser from "body-parser";

export const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(bodyParser.json({ limit: "500kb" }));
app.use(express.json());

app.use(morgan("dev"));

app.disable("x-powered-by");

app.get(paths.root, pingController);

app.use(paths.user, userRouter);

app.use(paths.beaches, auth, beachesRouter);

app.use(notFoundError);

app.use(generalError);
