/// <reference types="cypress" />
describe('Posting an event', () => {
    it('adds event', () => {
        cy.request('POST', 'http://localhost:5050/postEvent', {
        name: "Just Dance party",
        startTime: "2023-05-18T16:00:00Z",
        postDate: "2023-05-18T16:00:00Z",
        description: "The Engineering LLC is holding a Just Dance party!! All dancer/non-dancers are welcome to attend",
        dorm_id: "maple-hall",
        location: "First floor lounge",
        organizer: "Engineering LLC"
        }).then((resp) => {
        expect(resp.status).to.eq(200);
        console.log(resp.body);
        });
    })
})
