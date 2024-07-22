import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoute } from "./routes/users.js";
import { postRoute } from "./routes/posts.js";
import { connectDB } from "./connectDb.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.port || 4000;
connectDB();
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.get("/", (req, res) => res.send("welcome to blog app"));
app.use((err, req, res, next) => {
  res.status(500).send({ message: `My Mistake= ${err.message}` });
});
app.listen(port, () =>
  console.log(`server is currently running on port http://localhost:${port}`)
);
