import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import { TEST } from "./constants";
console.log(TEST, "yoyo");

const app = express();
app.use(
	cors({
		origin: "*",
		// credentials:true
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
	res.send("HOME");
});

const server = http.createServer(app);

server.listen(8080, () => {
	console.log("Server running on http://localhost:8080/");
});

const MONGO_URL = "mongodb://127.0.0.1:27017/ts";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
	console.log(error);
});
