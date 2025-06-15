import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
dotenv.config();
const app = express();
const port = process.env.port||3000;
app.use(cors({
    origin: "*",
}));
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
