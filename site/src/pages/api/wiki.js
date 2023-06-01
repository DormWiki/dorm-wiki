import DOMPurify from 'isomorphic-dompurify';
import ClientPromise from "@/lib/mongodb";


export async function getWiki(dorm) {
	let client = await ClientPromise;
  let db = client.db("DormWiki");
  let collection = await db.collection("Dorm");
  if (dorm == undefined) {
    // no parameter
    let results = await collection
      .find()
      .project({ _id: 1 })
      .toArray();
		return results;
  } else {
    let results = await collection
      .find({ _id: dorm })
      .toArray();
		return results;
  }
}

// handling all the wiki calls
// GET:
// - '/wiki': return the list of dorms
// - '/wiki?dorm=': rerturn all the form info for the given dorm
export default async function handler(req, res) {
	let ret = await getWiki(req.query.dorm);
	res.json(ret).status(200);
}