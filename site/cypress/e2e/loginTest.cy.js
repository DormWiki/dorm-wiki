describe('Google', function () {
	// beforeEach(function () {
	// //   cy.task('db:seed')
	// cy.visit('http://localhost:3000')
	//   cy.loginByGoogleApi()
	// })
  
	// it('shows onboarding', function () {
	//   cy.contains('Welcome').should('be.visible')
	// })

	it('shows onboarding', function () {
		cy.loginByGoogleApi()
		// cy.visit('http://localhost:3000/api/auth/callback/google');
		// cy.get('button[className="google_button"]').click()

	  })
  })