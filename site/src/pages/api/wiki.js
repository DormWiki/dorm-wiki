import DOMPurify from 'isomorphic-dompurify';
import ClientPromise from "@/lib/mongodb";


// handling all the wiki calls
// GET:
// - '/wiki': return the list of dorms
// - '/wiki?dorm=': rerturn all the form info for the given dorm
export default async function handler(req, res) {
	let client = await ClientPromise;
	let db = client.db("DormWiki");
	let collection = await db.collection("Dorm");
	if (req.query.dorm == undefined) { // no parameter
		let results = await collection.find().project({_id: 1}).toArray(function(err, result) {
		if (err) throw err;
		res.json(result).status(200);
		});
	} else {
		let results = await collection.find({_id: req.query.dorm}).toArray(function(err, result) {
		if (err) throw err;
		res.json(result).status(200);
		});
	}
}