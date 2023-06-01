/*
Delete Like Test
Success: if we click the like button and get redirected to log in page
Fail: if any error occurs
*/

describe('Delete Like Test', () => {
	it('Remove like for an event on Home page', () => {
		// visiting the main page
		cy.visit('http://localhost:3000/events')

		// navigate to event "Niki Meet & Greet"
        cy.get('div[class^="Events_event__"]').first().within(() => {
            // click on like button twice to like and unlike the event
            cy.get('button[class*="Likebutton"]').click();
            // see the number of likes displayed on the website
            // if success, the number should increment then decrement
        });
        // verify that we land on the log in page due to user not logged in
        cy.url()
            .should('be.equal', 'http://localhost:3000/login')
	})
})