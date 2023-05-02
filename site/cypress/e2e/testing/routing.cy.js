/// <reference types="cypress" />
context('routing', () => {
  
  it('dynamic routing test', () => {
    cy.request({
      url: "http://localhost:3000/wiki/dorms/maple-hall",
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
    cy.request({
      url: "http://localhost:3000/wiki/dorms/random",
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
    });
  })
})