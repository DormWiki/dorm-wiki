# DormWiki
DormWiki is a website designed to inform prospective/incoming students about various dorms on campus. It will summarize all the information students need to know about the dorm, helping them find the one that most suits their needs. The website also will help current students stay updated about events happening at their dorms, fostering a sense of community and belonging.

## Layout
- site: Contains all of the code for the front end and API
  - `src/pages/api` — contains the code for all API calls
- server: Contains all of the code for the back end (http requests, etc.)
- database: MongoDB

## Using our website
Website is currently deployed at https://dorm-wiki.vercel.app/. It may misbehave (very scuffed) for some browsers (best to use Chrome)

### Pages:
- Home: search/navigate to dorm pages, lists top upcoming events
- Events: slideshow for the most popular events; shows upcoming events (sorted by the time); user can post events by entering event logistics (title, organizer, location, dorm, date/time)
	- Individual event page: view more details about a particular upcoming event
- Wiki: shows the previews of the dorms; clicking the dorm types in the dropdown list filters the dorms
	Dorm page: shows pictures, reviews/ratings for the dorm; ability for users to submit a review
- About: understand the DormWiki’s purpose and goals, learn about the developers
- Login: sign in through Google to to post an event or a review; if signed in, user can view profile page

## Building and testing the system
### To run locally:
1. Contact team member to add `.env.local ` in `/site` to enble google authentication
2. Install the dependencies using `npm run v`
3. Run both servers (front & back) concurrently: `npm run all`
	- Or to check the log in a cleaner way, you can run these commands in different terminal windows:
		- Start the web server: `npm run dev` 
		- Start the database server: `npm run data` 

### To run Cypress Test:
1. Follow the instruction to install cypress: https://docs.cypress.io/guides/getting-started/installing-cypress
2. Add local IP to MongoDB in order to run the system
	- Go to MongoDB and sign in by given account and password(on slack)
	- Navigate to "Network Access" and current IP address
4. Run Cypress e2e tests
	- under the main repo, run `npm run cypress:open`
	- Select E2E testing 
	- Select a browser (Recommend Chrome) and click Start
	- On the left side, select "Specs" and all the tests will be shown

## Reporting a bug
Use this [Bug Report template](https://github.com/DormWiki/dorm-wiki/blob/main/bug_template.md) to inform us about the bug.

### Known Bugs
- Build failure: currently building the project may not successfully execute. 
	- This is because of some issues regarding the database; this should not matter as the website can run through development mode instead.
- Not all dorm pages can be served (McMahon, Oak, Poplar, Nordheim, Radford, Blakeley)
- Deprecated component (`useLayoutEffect` does nothing on the server)
- Rating stars are 5px cut short
- Scaling issues with dropdown menu on some mac displays

## Contributing
If you want to contribute to our project, below are some details you may find useful.

## Layout
- `cypress`: all the testing code
- `site`: next.js root folder
	- `public`: contains all public resources (mostly images)
	- `src`: front-end code
		- `components`: react components
		- `pages`: all of the next.js code for the web pages
			- `api`: all of the api calls
		- `styles`: all of the css for the pages

## To Add New Tests
1. Go to `cypress/e2e/testing`.
2. Create a test named by the component you want to test using camelCase notation and ending with Test.cy.js (e.g. `postSingleEventTest.cy.js`).
3. Once you create the new test, refresh the Cypress test window. Click on the test you wrote to run it.

## Operational use cases
1. Displaying a dorm page (Maple Hall)
	- From the home page, navigate to "Wiki", then click "Maple Hall". We will fetch the dorm information and reviews from the database and display everything on the page.
2. Post a review
	In a dorm page (Maple Hall), underneath the dorm picture, users can leave a review for a dorm by filling in their name, review, and rating for the dorm. On submission, will send all the information to our database and store it there. If they refresh the page, we will fetch all the dorm info from database again so the new review will be posted on the dorm page. 
