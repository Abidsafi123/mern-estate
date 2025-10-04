import express from "express";
import connection from "./config/db.js";
import AuthRoute from "./routes/auth_route.js";
import userRouter from "./routes/userRoute.js";
import listingRouter from "./routes/listing.js";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", AuthRoute);
app.use("/user", userRouter);
app.use("/list", listingRouter);

// Serve React build
app.use(express.static(path.join(__dirname, "client", "dist")));

// ✅ Regex catch-all (no quotes)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// DB connection
connection();

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ App is running on http://localhost:${port}`);
});
