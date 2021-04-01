import express from "express";
import mongoose from "mongoose";
import Post from "./models/Post.js";
import router from "./routes/router.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT ?? 3001;
const DB_URL = process.env.DB_URL;
const app = express();
app.use(express.json());
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(
      DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        console.log("Connection established");
      }
    );
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
