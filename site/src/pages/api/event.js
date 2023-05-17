import DOMPurify from 'isomorphic-dompurify';
import ClientPromise from "@/lib/mongodb";

const URL = "https://localhost:5050";

// Handling event calls
// GET: 
// - '/event': return all the coming events
// - '/event?dorm=': return all the coming events in the given dorm
// POST:
// - '/event': post an event

export async function getEvent(dorm) {
	let client = await ClientPromise;
  let db = client.db("DormWiki");
  let collection = await db.collection("Event");
	if (dorm == null) {
    // no parameter
    let results = await collection
      .find()
      .sort({ startTime: -1 });
		console.log(results);
		return results;
  } else {
    let results = await collection
      .find({ dorm_id: req.query.dorm })
      .sort({ startTime: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return JSON.stringify(result);
      });
  }
}
export default async function handler(req, res) {
	
	if (req.method == 'GET') {
		getEvent(req.query.dorm);
	} else { // POST CALL
		const count = await collection.countDocuments();
		const body = req.body;
		let newEvent = {
			_id: (count + 1),
			name: DOMPurify.sanitize(body.name),
			startTime: DOMPurify.sanitize(body.startTime),
			postDate: DOMPurify.sanitize(body.postDate),
			dorm_id: DOMPurify.sanitize(body.dorm_id),
			location: DOMPurify.sanitize(body.location),
			organizer: DOMPurify.sanitize(body.organizer)
		}
		try{
			const dorm = await db.collection('Dorm');
			await dorm.updateOne(
			{ _id: req.body.dorm_id},
			{ $push: { event: count} }
			)
		}catch(err){
			console.log(err);
		}
		
		let results = await collection.insertOne(newEvent, function(err, result) {
			if (err) throw err;
			res.json({_id: result.insertedId}).status(200);
		});
	}


	
}