// Instruction:
// Modify the event fields from line 14-19 to change to a new event
// 200: new event is successfully posted and can be found on events 
//		page and form page
// 400: if any error occurs



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
			startTime: '2023-05-30T23:52',
			text: '*&sd^vdf(bg(sav&f',
		}

		// fill out the form with following
		cy.get("input[name='name']").type(event.name);
		cy.get("input[name='organizer']").type(event.organizer);
		cy.get("input[name='location']").type(event.location);
		cy.get("select[name='dorm_id']").select(event.dorm);
		cy.get("input[name='startTime']").type(event.startTime);
		cy.get("textarea[name='text']").type(event.text);
		
		// click the submit button and submit
		cy.get("input[id='submit']").click()

		// Expected: the new Event should show up:
		// 1. in the event page
		cy.contains(event.text);
		cy.contains(event.organizer);
		cy.contains(location);

		//2. the correponding dorm page
		cy.visit('http://localhost:3000/wiki/dorms/' + event.dorm.split(" ").join("-").toLowerCase())
		cy.contains(event.text);
		cy.contains(event.organizer);
		cy.contains(location);
	})
})