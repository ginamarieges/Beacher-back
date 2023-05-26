import { Joi } from "express-validation";
import { type UserCredentials } from "../../types";

const loginSchema = {
  body: Joi.object<UserCredentials>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

export default loginSchema;
