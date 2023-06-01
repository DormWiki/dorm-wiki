/* UNDER DEVELOPMENT*/
// What are some good testcases for wiki?

describe('Wiki Test', () => {
  it('Test /wiki, get a list of dorms', () => {
    cy.visit('http://localhost:3000/wiki')
    cy.contains('Maple Hall')
  })

  it('Test /wiki?dorm=, getting the dorm info correctly', () => {
    // Test some random dorm info:

    // test Elm Hall description
    cy.visit('http://localhost:3000/wiki/dorms/elm-hall')
    cy.contains('Elm Hall offers Fitness Center West,')
  })
})