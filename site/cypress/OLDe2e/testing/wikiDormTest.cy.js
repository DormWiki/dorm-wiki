/// <reference types="cypress" />

// Test if wiki call gives correct dorm names
context('Wiki: single dorm info testing', () => {
	it('dynamic routing test', () => {
	  cy.request({
		url: "http://localhost:5050/wiki?dorm=maple-hall",
		failOnStatusCode: false,
	  }).then((resp) => {
		expect(resp.status).to.eq(200);
		console.log(JSON.stringify(resp.body));
	  });
	})
  })