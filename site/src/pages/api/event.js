import DOMPurify from 'isomorphic-dompurify';
import ClientPromise from "@/lib/mongodb";

// const URL = "https://localhost:5050";

// Handling event calls
// GET: 
// - '/event': return all the coming events
// - '/event?dorm=': return all the coming events in the given dorm
// POST:
// - '/event': post an event
// - '/event/:id/like': like an event
// DELETE:
// - '/event/:id/like': unlike an event

export async function getEvent(dorm) {
	let client = await ClientPromise;
  let db = client.db("DormWiki");
  let collection = await db.collection("Event");
	if (dorm === undefined) {
    // no parameter
    let results = await collection
      .find()
      .sort({ startTime: -1 })
			.toArray();
		return results;
  } else {
		let results = await collection
      .find({ dorm_id: dorm })
      .sort({ startTime: -1 })
      .toArray();
    return results;
	}
}
export default async function handler(req, res) {
	let client = await ClientPromise;
	let db = client.db("DormWiki");
	let collection = await db.collection("Event");
	if (req.method == 'GET') {
		let ret = await getEvent(req.query.dorm);
		res.status(200).json(ret);
	} else if (req.method == 'DELETE'){ // DELETE CALL
		let results = await collection.updateOne({_id: req.query.id}, {$inc : {likes: -1}},
			function(err, result) {
			if (err) throw err;
			res.json("Unliked").status(200);
		});
	} else { // POST CALL
		if (req.query != undefined){ // Liking an event
			let results = await collection.updateOne({_id: req.query.id}, {$inc : {likes: 1}},
				function(err, result) {
				if (err) throw err;
				res.json("Liked").status(200);
			});
		} else {
			const count = await collection.find().sort({_id:-1}).limit(1)._id;
			const body = req.body;
			// Create a new event object to be inserted into the Dorm and Event table
			let newEvent = {
				_id: (count + 1),
				name: DOMPurify.sanitize(body.name),
				startTime: DOMPurify.sanitize(body.startTime),
				description: DOMPurify.sanitize(body.description),
				postDate: DOMPurify.sanitize(body.postDate),
				dorm_id: DOMPurify.sanitize(body.dorm_id),
				location: DOMPurify.sanitize(body.location),
				organizer: DOMPurify.sanitize(body.organizer)
			}
			console.log(newEvent);
			try {
				const dorm = await db.collection('Dorm');
				await dorm.updateOne(
				{ _id: req.body.dorm_id},
				{ $push: { event: count} }
				)
			} catch (err) {
				console.log(err);
			}
			
			let results = await collection.insertOne(newEvent, function(err, result) {
				if (err) {
					res.status(500).send();
					console.error(err);
				} else {
					res.json({_id: result.insertedId}).status(200);
				}
			});
		}
	}
}