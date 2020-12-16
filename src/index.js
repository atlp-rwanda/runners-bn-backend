import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import routes from "./routes";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use("/*", (_req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));
