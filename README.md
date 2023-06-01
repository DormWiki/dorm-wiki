# DormWiki
DormWiki is a website designed to inform prospective/incoming students about various dorms on campus. It will summarize all the information students need to know about the dorm, helping them find the one that most suits their needs. The website also will help current students stay updated about events happening at their dorms, fostering a sense of community and belonging.

## Layout
- site: Contains all of the code for the front end and API
  - `src/pages/api` — contains the code for all API calls
  - `src/pages/` - contains the code for the pages
- database: MongoDB

## Using our website
Website is currently deployed at https://dorm-wiki.vercel.app/. It may misbehave (very scuffed) for some browsers (best to use Chrome with light mode)

### Pages:
- Home: search/navigate to dorm pages, lists top upcoming events
- Events: slideshow for the most popular events; shows upcoming events (sorted by the time); user can post events by entering event logistics (title, organizer, location, dorm, date/time)
	- Individual event page: view more details about a particular upcoming event
- Wiki: shows the previews of the dorms; clicking the dorm types in the dropdown list filters the dorms
	Dorm page: shows pictures, reviews/ratings for the dorm; ability for users to submit a review
- About: understand the DormWiki’s purpose and goals, learn about the developers
- Login: sign in through Google to to post an event or a review; if signed in, user can view profile page

## Building and testing the system
### Building
Building the project is fairly simple and can be achieved via `npm run build`.
### To run locally:
1. Contact team member for API keys, then add them to the environment variables of the project.
2. Install the dependencies using `cd site && npm install`
3. The server can be run in development mode via `npm run dev`.
	1. To build and run the production version, use `npm run build` to build and `npm start` to start the server.

### To run Cypress Test:
1. Follow the [instructions](https://docs.cypress.io/guides/getting-started/installing-cypress) to install cypress.
2. Contact a team member to gain access to make requests to database.
3. To run Cypress e2e tests:
	1. in root, run `npm run cypress:open`
	2. Select E2E testing 
	3. Select a browser (Recommend Chrome) and click Start
	4. On the left side, select "Specs" and all the tests will be shown
4. If you prefer, you can use the [Cypress CLI](https://docs.cypress.io/guides/guides/command-line).

## Reporting a bug
Use this [Bug Report template](https://github.com/DormWiki/dorm-wiki/blob/main/bug_template.md) to inform us about the bug.

### Known Bugs
- No known bugs at the moment :)

## Contributing
If you want to contribute to our project, below are some details you may find useful. Contact a team member for API keys.

### Layout
- `cypress`: all the testing code
- `site`: next.js root folder
	- `public`: contains all public resources (mostly images)
	- `src`: front-end code
		- `components`: react components
		- `pages`: all of the next.js code for the web pages
			- `api`: the backend API calls
		- `styles`: all of the css for the pages

### To Add New Tests
1. Go to `cypress/e2e/testing`.
2. Testing documentation can be found [here](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test).
3. Create a test named by the component you want to test using camelCase notation and ending with Test.cy.js (e.g. `postSingleEventTest.cy.js`).
4. Once you create the new test, refresh the Cypress test window. Click on the test you wrote to run it.
