describe('POST /postReview', () => {

  it('posts a new review to the database', () => {
    // Make a POST request to the /postReview route with a request body containing review data
    cy.request({
      method: 'POST',
      url: 'http://localhost:5050/postReview',
      body: {
        user: 'Yijia Zhao',
        title: 'bad dorm',
        text: 'I dont like this dorm!',
        date: '2021-06-12',
        rating: 2,
        ID: 'maple-hall'
      }
    }).then((response) => {
      // Assert that the response is successful
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Review posted successfully!');
    });
  });
});