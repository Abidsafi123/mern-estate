import express from "express";
import connection from "./config/db.js";
import userRoute from "./routes/auth_route.js";
import router from "./routes/auth_route.js";
const app = express();
app.use(express.json());
app.use("/api", userRoute);
connection();

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = statusCode.message || "Internal server error";
//   return res.status(statusCode.json({
//     success:false,
//     message,
//     statusCode

//   }))
// });
const port = 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
