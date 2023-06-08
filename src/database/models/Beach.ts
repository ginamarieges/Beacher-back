import { Schema, Types, model } from "mongoose";
import User from "./User.js";
const beachSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  town: String,
  description: String,
  services: {
    baywatch: Boolean,
    umbrellas: Boolean,
    dogsAllowed: Boolean,
    showers: Boolean,
    restaurant: Boolean,
    familyBeach: Boolean,
    secretBeach: Boolean,
  },
  addServices: String,
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Beach = model("Beach", beachSchema, "beaches");

export default Beach;
