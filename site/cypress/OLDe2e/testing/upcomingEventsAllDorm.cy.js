/// <reference types="cypress" />

// Test if wiki call gives correct dorm names
context('getUpcomingEvents: return all events', () => {
	it('dynamic routing test', () => {
	  cy.request({
		url: "http://localhost:5050/getUpcomingEvents",
		failOnStatusCode: false,
	  }).then((resp) => {
		expect(resp.status).to.eq(200);
		console.log(resp.body);
	  });
	})
  })