import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_STRING);
    console.log(
      `Connected to ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (error) {
    console.log("Error while connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
