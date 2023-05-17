import { MongoClient } from "mongodb";

const uri = process.env.ATLAS_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.ATLAS_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options);
clientPromise = client.connect();


export default clientPromise;
