/*
Post event: Manual Testing
Modify the event fields from line 16-21 to change to a new event
Success: new event is successfully posted and can be found on events 
		page and form page
Fail: if any error occurs
*/

// const { fromDate } = require("next-auth/src/core/lib/utils");

describe('Event Test', () => {
	it('Test posting new event', () => {
		// visiting the page
		cy.visit('http://localhost:3000/events')

		// replace all the data in event to test add new event
		const event = {
			name: '403 Test Writing',
			organizer: 'Jaylyn',
			location: 'roof',
			dorm: 'Elm Hall',
			startTime: '2099-12-31T23:59',
			text: 'testingggg',
		}

		// fill out the form with following
		cy.get("input[name='name'], {force: true}" ).type(event.name);
		cy.get("input[name='location']").type(event.location);
		cy.get("select[name='dorm_id']").select(event.dorm);
		cy.get("input[name='startTime']").type(event.startTime);
		cy.get("textarea[name='text']").type(event.text);
		
		// click the submit button and submit
		cy.get("input[id='submit']").click()

		cy.url().should('be.equal', 'http://localhost:3000/login')
	})
})