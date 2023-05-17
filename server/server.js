import { config } from 'dotenv';
import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import posts from "./routes/posts.mjs";

// for mongoDB
import db from "./db/conn.mjs";
import objectId from "mongodb";
import bodyParser from 'body-parser';
const ObjectId = objectId;
// for google authentication
import session from "express-session";
import passport from 'passport';
import googleStrategy from 'passport-google-oauth';
const GoogleStrategy = googleStrategy.OAuth2Strategy;

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


// for google authentication
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

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


// login
app.get('/login', function(req, res) {
  res.render('pages/auth');
});


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
      res.json(result).status(200);
    });
  }
});


// getUpcomingEvents : get all the coming events
// getUpcomingEvents?dorm= : get all the coming events in a certain dorm
app.get("/getUpcomingEvents", async (req, res) => {
  let collection = await db.collection("Event");
  if (req.query.dorm == undefined) { // no parameter
    let results = await collection.find().sort({startTime: -1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result).status(200);
    });
  } else {
    let results = await collection.find({dorm_id: req.query.dorm}).sort({startTime: -1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result).status(200);
    });
  }
});


// postEvent: request to post an event
app.post("/postEvent", async (req, res) => {
  let collection = await db.collection("Event");
  const count = await collection.countDocuments();
  let newEvent = {
    _id: (count + 1),
    name: req.body.name,
	  startTime: req.body.startTime,
	  postDate: req.body.postDate,
	  dorm_id: req.body.dorm_id,
	  location: req.body.location,
    organizer: req.body.organizer
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
  
});

// postReview: get review from frontend 
app.post("/postReview", async(req, res) => {
  let collection = await db.collection("Dorm");
  try {
    // create a new rating object to be included in review
    const rating = {
      Environment: req.body.rating.Environment,
      Food: req.body.rating.Food,
      Walkability: req.body.rating.Walkability,
      Safety: req.body.rating.Safety,
    }
    // Create new review object from request body
    const newReview = {
      title: req.body.title,
      user: req.body.user,
      text: req.body.text,
      date: req.body.date,
      rating: rating
    };
    const result = await collection.updateOne(
      {_id: req.body.ID},
      { $push: {review: newReview} }
    );
    
    console.log(req.body);

    return res.status(200).send('Review posted successfully!');

  } catch(err) {
    return res.status(500).send('Error posting review');
  } 

});








// ***************************************************************************************************
/*  PASSPORT SETUP  */

var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  Google AUTH  */
 
const GOOGLE_CLIENT_ID = '330949585590-2e6pm4judqk693avjvspavummmhjlfi4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5050/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

