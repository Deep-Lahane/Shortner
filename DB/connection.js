import envVars from 'dotenv'
import mongoose from "mongoose";

envVars.config();

const conn = () => {
	mongoose
		.connect(process.env.CONN_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("mongoose connected succesfully");
		})
		.catch((err) => console.log("err :", err.message));
};

export default conn;
