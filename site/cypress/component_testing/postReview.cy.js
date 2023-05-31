/// <reference types="cypress" />
describe('Post a review', () => {
    it('add a review', () => {
        cy.request('POST', 'http://localhost:3000/wiki/dorms/mcmahon-hall/review', {
			title: "Component testing",
			user: "Jaylyn",
			text: "testing",
			date: "2023-05-25T20:51:28.219Z",
			rating: {enviornment: 5, food: 5, walkability: 5, safety: 5}
        }).then((resp) => {
			expect(resp.status).to.eq(200);
			console.log(resp.body);
        });
    })
})

///title: DOMPurify.sanitize(body.title),
// user: DOMPurify.sanitize(body.user),
// text: DOMPurify.sanitize(body.text),
// date: DOMPurify.sanitize(body.date),
// rating: body.rating,
// poster: body.poster

// title: DOMPurify.sanitize(body.title),
// user: DOMPurify.sanitize(body.user),
// text: DOMPurify.sanitize(body.text),
// date: DOMPurify.sanitize(body.date),
// rating: body.rating,
// poster: body.poster

// describe('POST /postReview', () => {

// 	it('posts a new review to the database', () => {
// 	  // Make a POST request to the /postReview route with a request body containing review data
// 	  cy.request({
// 		method: 'POST',
// 		url: 'http://localhost:5050/postReview',
// 		body: {
// 		  user: 'Jaylyn',
// 		  title: 'bad dorm',
// 		  text: 'I dont like this dorm!',
// 		  date: '2021-06-12',
// 		  rating: {
// 			Environment: 1,
// 			Food: 1,
// 			Walkability: 1,
// 			Safety: 1,
// 		  },
// 		  ID: 'maple-hall'
// 		}
// 	  }).then((response) => {
// 		// Assert that the response is successful
// 		expect(response.status).to.eq(200);
// 		expect(response.body).to.eq('Review posted successfully!');
// 	  });
// 	});
//   });