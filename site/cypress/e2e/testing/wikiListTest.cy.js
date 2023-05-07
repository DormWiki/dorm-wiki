/// <reference types="cypress" />

// Test if wiki call gives correct dorm names
context('Wiki: dorm list testing', () => {
	it('dynamic routing test', () => {
	  cy.request({
		url: "http://localhost:5050/wiki",
		failOnStatusCode: false,
	  }).then((resp) => {
		expect(resp.status).to.eq(200);
	  });
	})
  })