# Design Doc
This is a design doc
## Front End
 this is the front end
 ### Index
 - Logo
 - Slogan
 - Links to everything
 ### Dorm Wiki
 - List of dorms
 - Information about each dorm (new page)
 - Reviews
 - ? Add information to wiki
 ### Login
 - User prompt
 - Update session to hold user authentication
 ### Error
 - 404
 - 401
 - 500
 ### ? User Profile
 - Settings
 - Saved/liked events
 - User profile
 - User bio
 - Dorm info
 - ? Friends
 ### Events
 - Information about event
 - Contact info
 - Photos
 - RSVP ("I'm going!")
 - Guest list
 ### About
 - Mission statement
 - Info about the team
 - Contact info
 - Customer support -- submit reports/bugs
 ### Sessions (Information Stored)
 - Authentication
 - Settings/preferences
 ### Security
 - Events:
    - User has to be logged in to view
    - Event host has to be verified?
    - Official events only (for now)
## Back End
 this is the back end
 ### API Calls
 1. Home Page
   - Get home page
     - Upcoming event info (select the most recent x events)
       - Event name
       - Event time
       - Event description
       - Event organizer
       - Event pic (optional)
       - Original Poster
 2. Dorm page
   - Get dorm info
     - Dorm picture
     - Dorm description
       - Address
       - Room types
       - Location
       - Food options
     - Reviews
       - Overall rating
       - Each review has
         - Name of reviewer
         - Detailed comments
         - Rating
         - Time posted
     - Events (select the most recent x events)
       - Event name
       - Event time
       - Event description
       - Event organizer
       - Event pic (optional)
       - Original Poster
   - Post new reviews
   - Post new events
 3. Event Page
   - Get Events
     - Event Name
     - Event time
     - Event description
     - Event organizer
     - Event pic (optional)
     - Original Poster
 4. Profile Page
   - Liked events
     - Event Name
     - Event time
     - Event description
     - Event organizer
     - Event pic (optional)
     - Original Poster  
 ### Database
 1. User table
   - user email (primary key)
   - name
   - list of liked events (reference Event table id column)
 2. Event table
   - event id (primary key)
   - name
   - time
   - description
   - organizer
   - picture
   - posted by (reference user email column in User table)
  3. Dorm table
   - name (primary key)
   - address
   - description
   - list of reviews (each review reference the id column in Review table)
   - list of events (each event reference the id column in Event table)
  4. Review table
   - review id (primary key)
   - posted by (reference user email column in User table)
   - rating
   - time
   - comment
