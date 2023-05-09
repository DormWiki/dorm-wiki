# DormWiki
DormWiki is a website designed to inform prospective/incoming students about various dorms on campus. It will summarize all the information students need to know about the dorm, helping them find the one that most suits their needs. The website also will help current students stay updated about events happening at their dorms, fostering a sense of community and belonging.

## Layout
- site: Contains all of the code for the front end.
- api: Contains all of the code for the api.
- server: Contains all of the code for the back end (http request, etc.).
- database: MongoDB


# Instructions for how to build and test the system.
Run Cypress Test:
1. Follow the instruction to install cypress (https://docs.cypress.io/guides/getting-started/installing-cypress)
2. Add local IP to MongoDB in order to run the system
   - Going to MongoDB and sign in by given account and password(on slack)
   - Navigate to "Network Access" and current IP address
4. Run Cypress e2e tests: `npm run cypress:open`



# Instructions for running the system
1. install the dependencies using `npm install`
2. run both servers(font and back) concurrently: `npm run all`
   OR 
   Check the log in a cleaner way: in different terminal windows (detail described in /package.json)
	- `npm run dev` to start the web server
	- `npm run data` to start the database server


# Operational use cases

