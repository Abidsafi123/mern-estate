import express from "express";
import connection from "./config/db.js";
import AuthRoute from "./routes/auth_route.js";
import userRouter from './routes/userRoute.js'
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", AuthRoute);
app.use('/user', userRouter);
connection();

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
