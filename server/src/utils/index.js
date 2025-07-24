import { connect } from "mongoose";

export const DBConnection = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(`MongoDB connection error ${error}`);
  }
};
