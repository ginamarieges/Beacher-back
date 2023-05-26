import { Schema, Types, model } from "mongoose";
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
  services: [{ service: String, hasService: Boolean }],
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Beach = model("Beach", beachSchema, "beaches");

export default Beach;
