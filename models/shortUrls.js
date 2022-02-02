import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
	{
		shortURL: {
			type: String,
			required: true,
		},
		fullURL: {
			type: String,
			required: true,
		},
		clicks: {
			type: Number,
		}
	},
	{ timestamps: true }
);

const ShortURL = mongoose.model("ShortURL", shortUrlSchema);

export default ShortURL;
