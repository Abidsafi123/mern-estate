import express from "express";
import connection from "./config/db.js";
import userRoute from "./routes/auth_route.js";
import router from "./routes/auth_route.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoute);
connection();

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
