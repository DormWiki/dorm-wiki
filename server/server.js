import { config } from 'dotenv';
import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import posts from "./routes/posts.mjs";

import db from "./db/conn.mjs";
import objectId from "mongodb";
const ObjectId = objectId;

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// ***************************************************************************************************

// Don't know how to insert date object on website T_T
// Need to figure it out later OR implement the post event functionality
// TODO 1: use date object to store dates -> sort events by time in getUpcomingEvents
// TODO 2: following move to separate routes (low priority, still need to figure out why router doesn't work :'(


// wiki: getting list of dorm names
// wiki?dorm= : getting single form info
app.get("/wiki", async (req, res) => {
  let collection = await db.collection("Dorm");
  if (req.query.dorm == undefined) { // no parameter
    let results = await collection.find().project({_id: 1}).toArray(function(err, result) {
      if (err) throw err;
        res.json(result).status(200);
    });
  } else {
    let results = await collection.find({_id: req.query.dorm}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result).status(200);
    });
  }
});


// getUpcomingEvents : get all the coming events
// getUpcomingEvents?dorm= : get all the coming events in a certain dorm
app.get("/getUpcomingEvents", async (req, res) => {
  let collection = await db.collection("Event");
  if (req.query.dorm == undefined) { // no parameter
    let results = await collection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
        res.json(result).status(200);
    });
  } else {
    let results = await collection.find({dorm_id: req.query.dorm}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result).status(200);
    });
  }
});

