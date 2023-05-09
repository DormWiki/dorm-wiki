/// <reference types="cypress" />
describe('Posting an event', () => {
    it('adds event', () => {
        cy.request('POST', 'http://localhost:5050/postEvent', {
        name: "Eat Together",
        startTime: "2023-05-18T16:00:00Z",
        postDate: "2023-05-18T16:00:00Z",
        dorm_id: "maple-hall",
        location: "First floor lounge",
        organizer: "Engineering LLC"
        }).then((resp) => {
        expect(resp.status).to.eq(200);
        console.log(resp.body);
        });
    })
})
