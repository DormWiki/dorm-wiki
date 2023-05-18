# DormWiki
DormWiki is a website designed to inform prospective/incoming students about various dorms on campus. It will summarize all the information students need to know about the dorm, helping them find the one that most suits their needs. The website also will help current students stay updated about events happening at their dorms, fostering a sense of community and belonging.

## Layout
- site: Contains all of the code for the front end.
- api: Contains all of the code for the api.
- server: Contains all of the code for the back end (http request, etc.).
- database: MongoDB
## Instructions for running the system
Website is currently deployed at https://dorm-wiki.vercel.app/. It may misbehave for some browsers on Mac.


## Using our website
- Home: search/navigate to dorm pages
- Events: slideshow for the most popular events; shows upcoming event, which are sorted by the time; user can post events by entering the information of the event (name, organizer, location, dorm, time)
	Single event page: view more details about an upcoming event
- Wiki: shows the previews of the dorms; clicking the dorm types in the dropdown list filters the dorms
	Dorm page: shows pictures, reviews/ratings for the dorm; ability for users to submit a review
- About: understand the DormWiki’s purpose and goals, learn about the developers
- Login: (eventually) user should sign in order to post an event and review

## Instructions for how to build and test the system.
To run locally:
1. install the dependencies using `npm run v`
2. run both servers(font and back) concurrently: `npm run all`
   OR 
   To check the log in a cleaner way, you can run these commands in different terminal windows:
	- `npm run dev` to start the web server
	- `npm run data` to start the database server

Run Cypress Test:
1. Follow the instruction to install cypress (https://docs.cypress.io/guides/getting-started/installing-cypress)
2. Add local IP to MongoDB in order to run the system
   - Going to MongoDB and sign in by given account and password(on slack)
   - Navigate to "Network Access" and current IP address
4. Run Cypress e2e tests: `npm run cypress:open`

## Bug Reporting
- use this [Bug Report template](https://github.com/DormWiki/dorm-wiki/blob/main/bug_template.md) to let us know about the bug.
### Known Bugs
- Build failure: currently building the project may not successfully execute. This is because of some issues regarding the database; this should not matter as the website can run through development mode instead.
- Not all dorm pages can be served:
	- McCahon, Oak, Poplar, Nordheim, Radford, Blakeley
- Deprecated component (useLayoutEffect does nothing on the server)
- Rating stars are 5px cut short
- Scaling issues with dropdown menu on some mac displays
- Google log in not working
## To Contribute
If you want to contribute to our project, here are some details you may find useful.
### Layout
- site: next.js root folder:
	- public: contains all public resources (mostly images)
	- Src: front-end code
		- Components: react components
		- Pages: all of the next.js code for the web pages
		- Styles: css
- server: Contains all of the code for the back end (http request, etc.)
	- Server.js: contains the API endpoints
## To Add New Tests
Go to  site/e2e/.

Create a test named by the component you want to test using camelCase notation and ending with Test.cy.js (e.g. postSingleEventTest.cy.js).

Once you create the new test, refresh the Cypress test window. Click on the test you wrote to run it.


# Operational use cases
1. Displaying Dorm Page (Maple Hall)
	From the Home page, by navigating to "Wiki" and then click "Maple Hall", we will fetch all the dorm information and 
	reviews from database and display everything on the page.
2. Post Review
	In a dorm page(Maple Hall), right below the dorm picture, we will be able to fill out the review the dorm by putting in name, 
	review, and rate for the dorm. Then we will send all the information to our database and store it there. If we refresh the
	page, we will fetch all the dorm info from database again so the new review will be posted on the dorm page. 
