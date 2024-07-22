import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
    });
    console.log(`mongodb database connected successfully.`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export { connectDB };
