import envVars from "dotenv";
envVars.config();

import express from "express";
import path from "path";
import conn from "./DB/connection.js";
import router from "./routes/routes.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/", router);

app.listen(process.env.PORT, () => {
	conn();
	console.log(`listening on ${process.env.PORT} port`);
});
