import mongoose from "mongoose";

const connectToDatabase = async (database: string) => {
  mongoose.set("debug", false);
  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await mongoose.connect(database);
};

export default connectToDatabase;
