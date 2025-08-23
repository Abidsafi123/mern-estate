import express from "express";
import connection from "./config/db.js";
const app = express();
connection();

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
