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
    lifeguard: Boolean,
    umbrellas: Boolean,
    dogs_allowed: Boolean,
    showers: Boolean,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Beach = model("Beach", beachSchema, "beaches");

export default Beach;
