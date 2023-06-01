/*
Review Test
Success: able to fill out the review form, clicking submit redirects to log in page
Fail: if any unexpected error occurs
*/

describe('Review Test', () => {
	it('Test /review, post a review', () => {
		cy.visit(Cypress.config('baseUrl') + 'wiki/dorms/elm-hall')

		// replace all the data in review to test add new review
		const review = {
			title: 'Test review',
			text: 'Yes Elmmmm!',
		}

		// fill out the form with following
		cy.get("input[name='title']").type(review.title);
		cy.get("textarea[name='text']").type(review.text);
		
		// navigate to review box rating stars area
		cy.get('.Wiki_review_rating__i2Rq7').first().within(() => {
			// choose 2 stars for all ratings
			cy.get('span[data-index = "2"]').click({ multiple: true })
		})

		// click the submit button and submit
		cy.get("input[id='submit']").click()

		// verify that the returned status code is 401 due to user not logged in
		cy.request({
			method: 'POST',  
			url: '/api/review', 
			failOnStatusCode: false
		}).then((response) => {
			expect(response.status).to.eq(401)
		})
	})
})