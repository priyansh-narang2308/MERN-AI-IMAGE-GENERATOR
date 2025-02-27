import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./db/connectDb.js";
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// api endpoints
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/dalle",dalleRoutes)


app.listen(PORT, () => {
    connectDb()
    console.log(`Server started on PORT: ${PORT}`);
});
