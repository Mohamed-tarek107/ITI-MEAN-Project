import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbconnection = mongoose
  .connect(
    `mongodb+srv://Tareks:${process.env.MongoPass}@cluster0.w0k6ff5.mongodb.net/moviesDB?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

export default dbconnection;
