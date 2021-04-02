import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT ?? 3001;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use(express.static("static")); //http://localhost:3000/1a2b89ea-8c9c-4e42-b52f-4f220e3490c1.jpg
app.use(fileUpload({}));
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
