import dotenv from "dotenv";
dotenv.config();  
import cors from "cors";
import express from "express";
import { conn } from "./src/connections/db.js";
import userRoute from "./src/routes/user.js";
import fileRoute from "./src/routes/file.js";
import apiKey from "./src/routes/apiKey.js";


const app = express();
app.use(express.json());


//http://localhost:5173

app.use(cors({
  origin: "https://cloud-share-sys.vercel.app",
  credentials: true
}));
const PORT = process.env.PORT || 4000;

 


async function startServer() {
  await conn();

  app.get("/", (req, res) => res.send("Hey there"));

  app.use("/api/auth", userRoute);
  app.use("/api/file", fileRoute);
  app.use("/api/apikeys",apiKey);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
