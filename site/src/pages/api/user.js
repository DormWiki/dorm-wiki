import ClientPromise from "@/lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "User is not logged in" });
    return;
  }
  let results = await getLikes(req, res);
  if (results === undefined) {
    res.status(401).json({ message: "Not logged in." })
  } else if (results === null) {
    res.status(500).json({ message: "An error occured on the server. Try again later." })
  } else {
    res.status(200).json(results);
  }
}

export async function getLikes(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return undefined;
  }
  try {
    let client = await ClientPromise;
    let db = client.db("DormWiki");
    let user = await db.collection("User");
    let results = await user.find({ _id: session.user.email }).toArray();
    return results;
  } catch (e) {
    console.error(e);
    return null;
  }
}