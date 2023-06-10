import { Joi } from "express-validation";
import { type BeachStateStructure } from "../../types";

const addBeachSchema = {
  body: Joi.object<BeachStateStructure>({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().allow(""),
    region: Joi.string().required(),
    town: Joi.string().required(),
    services: {
      showers: Joi.boolean(),
      baywatch: Joi.boolean(),
      umbrellas: Joi.boolean(),
      dogsAllowed: Joi.boolean(),
      restaurant: Joi.boolean(),
      familyBeach: Joi.boolean(),
      secretBeach: Joi.boolean(),
    },
    addServices: Joi.string().allow(""),
  }),
};

export default addBeachSchema;
