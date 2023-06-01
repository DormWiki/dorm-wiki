/*
Review Test
Modify the event number on line 15 "/event/___" to like a different event
Success: if the number of likes incremented for the corresponding event
Fail: if any error occurs
*/

describe('Review Test', () => {
	it('Test /review, post a review', () => {
	  cy.visit('http://localhost:3000/wiki/dorms/elm-hall')
	  cy.get("input[name='title']").type('<333>');
	  cy.get("input[name='name']").type('Jaylyn');
	  cy.get("textarea[name='text']").type('Elmmmm');
	//   cy.get("ReactStars[oncange=2]").click()
	// how to select the rating?


	})
})