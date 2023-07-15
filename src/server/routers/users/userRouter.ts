import { Router } from "express";
import { validate } from "express-validation";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/userControllers.js";
import loginSchema from "../../../utils/Schemas/loginSchema.js";
import paths from "../../paths/paths.js";

const userRouter = Router();

userRouter.post(paths.register, registerUser);

userRouter.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
