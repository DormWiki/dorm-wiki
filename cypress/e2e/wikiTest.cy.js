/* Wiki Test
Check if each dorm info is passed correctly
*/

describe('Wiki Test', () => {
  it('Test Maple Hall \'s name', () => {
    cy.visit('http://localhost:3000/wiki')
    // test Maple Hall's name
    cy.contains('Maple Hall')
  })

  it('Test Elm Hall \'s description', () => {
    cy.visit('http://localhost:3000/wiki/dorms/elm-hall')
    // test Elm Hall's description
    cy.contains('Elm Hall offers Fitness Center West,')
  })
})