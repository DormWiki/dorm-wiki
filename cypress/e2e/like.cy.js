/*
Like Test
Modify the event number on line 15 "/event/___" to like a different event
Success: if the number of likes incremented for the corresponding event
Fail: if any error occurs
*/

describe('Like Test', () => {
	it('Like an event on Home page', () => {
		// visiting the main page
		cy.visit('http://localhost:3000')

		// navigate to event "Niki Meet & Greet"
        cy.get('a[href = "/events/20"]').within(() => {
            // test like button
            cy.get('button[class = "Likebutton_event_button__Yeeej Likebutton_like__V563P"]').as('btn').click();
        })
		
	})
})