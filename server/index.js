import express from "express";
import connection from "./config/db.js";
import AuthRoute from "./routes/auth_route.js";
import userRouter from './routes/userRoute.js'
import listingRouter from "./routes/listing.js"
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", AuthRoute);
app.use('/user', userRouter);
 app.use('/api',listingRouter)
 
connection();

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
