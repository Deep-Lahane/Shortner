import conn from "./DB/connection";
import ShortURL from "./models/shortUrls";

conn();

// Get all urls older than 24 hours
async function deleteURLs() {
	await ShortURL.deleteMany(
		{
			createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		},
		function (err) {
			if (err) console.log(err);
			console.log("Successful deletion");
		}
	);
	console.log("Job done!");
}

deleteURLs().then(process.exit);
