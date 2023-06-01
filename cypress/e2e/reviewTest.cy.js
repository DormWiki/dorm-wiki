/*
Review Test
Success: able to fill out the review form, clicking submit redirects to log in page
Fail: if any unexpected error occurs
*/

describe('Review Test', () => {
	it('Test /review, post a review', () => {
		cy.visit('http://localhost:3000/wiki/dorms/elm-hall')

		// replace all the data in review to test add new review
		const review = {
			title: 'Test review',
			text: 'Yes Elmmmm!',
		}

		// fill out the form with following
		cy.get("input[name='title']").type(review.title);
		cy.get("textarea[name='text']").type(review.text);
		
		// navigate to review box rating stars area
		cy.get('div[class^=Wiki_review_rating__]').first().within(() => {
			// choose 2 stars for all ratings
			cy.get('span[data-index = "2"]').click({ multiple: true })
		})

		// click the submit button and submit
		cy.get("input[id='submit']").click()

		// verify that the returned status code is 401 due to user not logged in
		cy.url()
            .should('be.equal', 'http://localhost:3000/login')
	})
})