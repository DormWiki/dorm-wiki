import DOMPurify from "isomorphic-dompurify";
import ClientPromise from "@/lib/mongodb";

const URL = "https://localhost:5050";

// handling all the review calls
// POST:
// '/review': post single review to the given dorm
export default async function handler(req, res) {
  	let client = await ClientPromise;
    let db = client.db("DormWiki");
    let collection = await db.collection("Dorm");
  try {
    // Create new review object from request body
    const body = req.body;
    const newReview = {
      title: DOMPurify.sanitize(body.title),
      user: DOMPurify.sanitize(body.user),
      text: DOMPurify.sanitize(body.text),
      date: DOMPurify.sanitize(body.date),
      rating: DOMPurify.sanitize(body.rating),
    };
    const result = await collection.updateOne(
      { _id: req.body.ID },
      { $push: { review: newReview } }
    );
    return res.status(200).send("Review posted successfully!");
  } catch (err) {
    return res.status(500).send("Error posting review");
  }
}
