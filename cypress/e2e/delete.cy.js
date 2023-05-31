/*
Delete Like Test
Modify the event number on line 15 "/event/___" to like a different event
Success: if the number of likes incremented and then decremented to the
original value for the corresponding event
Fail: if any error occurs
*/

describe('Delete Like Test', () => {
	it('Remove like for an event on Home page', () => {
		// visiting the main page
		cy.visit('http://localhost:3000')

		// navigate to event "Niki Meet & Greet"
        cy.get('a[href = "/events/20"]').within(() => {
            // test like then unlike the event
            cy.get('button[class = "Likebutton_event_button__Yeeej Likebutton_like__V563P"]')
                .click().click();
        })
		
	})
})