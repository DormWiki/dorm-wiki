/* UNDER DEVELOPMENT*/

describe('Log In Test', () => {
	it('Test /login', () => {
	  cy.visit('http://localhost:3000/login')
	  cy.get('GoogleButton text="Sign in with Google"').click()
	  
	  cy.url().should('include', '/user')


	})
})