import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
}
