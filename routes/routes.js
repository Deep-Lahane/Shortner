import envVars from 'dotenv'
envVars.config();

import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();
import ShortURL from "../models/shortUrls.js";


router.get("/", async (req, res) => {
	try {
		res.status(200).render("index", {
			shortURL: undefined,
			fullURL: undefined,
			isUrl: undefined
		});
	} catch (error) {
		res.json({ error: error.message });
	}
});

// --------------------------------------------------------------------------------

const is_url = (str) => {
	const regex = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/);
	console.log(regex.test(str));
	return regex.test(str);
};

const sliceLongURL = (fullurl) => {
	return fullurl.slice(0,40)+'...';
}


router.post("/", async (req, res) => {
	try {
		//  Check given url is valid or not
		if (!is_url(req.body.fullUrl)) {
			res.render("index", {
				isUrl: false,
				shortURL: undefined,
				fullURL: undefined,
			});
			return;
		}

		// Check input url's short utl alredy presnt in DB or not :
		const isPresent = await ShortURL.findOne({ fullURL: req.body.fullUrl });
		if (isPresent) {
			res.render("index", {
				shortURL: `${process.env.APP_BASE_URL}/${isPresent.shortURL}`,
				fullURL: sliceLongURL(isPresent.fullURL),
			});
			return;
		}

		// convert longURL into shortURL and save in db
		const document = await new ShortURL({
			shortURL: nanoid(7),
			fullURL: req.body.fullUrl,
			clicks: 0,
		});
		await document.save();
		res.render("index", {
			shortURL: `${process.env.APP_BASE_URL}/${document.shortURL}`,
			fullURL: sliceLongURL(document.fullURL),
		});
	} catch (error) {
		console.log(error);
		console.log("not valid url");
			res.render("index", {
				isUrl: false,
				shortURL: undefined,
				fullURL: undefined,
			});
			return;
	}
});

// --------------------------------------------------------------------------------

router.get("/:shortUrl", async (req, res) => {
	try {
		const document = await ShortURL.findOne({shortURL: req.params.shortUrl});
		if(document == null) return res.status(404).render('404Page');

  		document.clicks++;
  		await document.save();
		res.status(302).redirect(document.fullURL);
	} catch (error) {
		console.log(error);
		res.status(400).send({error: error.message})
	}
});


router.get("*", (req,res) => {
	res.status(302).render('404Page');
})

export default router;
