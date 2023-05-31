/* UNDER DEVELOPMENT*/

describe('Review Test', () => {
	it('Test /review, post a review', () => {
	  cy.visit('http://localhost:3000/wiki/dorms/elm-hall')
	  cy.get("input[name='title']").type('<333>');
	  cy.get("input[name='name']").type('Jaylyn');
	  cy.get("textarea[name='text']").type('Elmmmm');
	//   cy.get("ReactStars[oncange=2]").click()
	// how to do the star?


	})
})