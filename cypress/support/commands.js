Cypress.Commands.add('loginByGoogleApi', () => {
	cy.log('Logging in to Google')
	cy.request({
	  method: 'POST',
	  url: 'http://localhost:3000/api/auth/callback/google',
	  body: {
		grant_type: 'refresh_token',
		// client_id: Cypress.env('googleClientId'),
		// client_secret: Cypress.env('googleClientSecret'),
		// refresh_token: Cypress.env('googleRefreshToken'),
		client_id: '330949585590-2e6pm4judqk693avjvspavummmhjlfi4.apps.googleusercontent.com',
		client_secret: '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',
		refresh_token: '1//04DYbT0utZfzeCgYIARAAGAQSNgF-L9Irih_sYOVEKvJt5Z6_vUxE3fYrXO0GHDz86MhO8VdbrxfgTb8rTNilwx34Y9H89OiR9g',
	  },
	}).then(({ body }) => {
	  const { access_token, id_token } = body
  
	  cy.request({
		method: 'GET',
		url: 'http://localhost:3000/api/auth/callback/google',
		headers: { Authorization: `Bearer ${access_token}` },
	  }).then(({ body }) => {
		cy.log(body.email)
		const userItem = {
		  token: id_token,
		  user: {
			googleId: body.sub,
			email: body.email,
			givenName: body.given_name,
			familyName: body.family_name,
			imageUrl: body.picture,
		  },
		}
  
		window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
		cy.visit('localhost:3000/user')
		// cy.visit('http://localhost:3000/api/auth/callback/google')
		// cy.visit('localhost:3000/user')
	  })
	})
  })