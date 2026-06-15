import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
} catch (error) {
  console.dir(
    {
      name: error.name,
      message: error.message,
      code: error.code,
      cause: error.cause,
      stack: error.stack,
    },
    { depth: null }
  );
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
