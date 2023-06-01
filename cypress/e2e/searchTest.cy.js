/*
Search Test
Success: if the search on the main page does display the correct result and goes 
	 to the corresponding dorm selected.
Fail: if any error occurs
*/

describe('Search Test', () => {
	it('Test for Maple Hall, search for "Map" with one result', () => {
		// visiting the main page
		cy.visit('http://localhost:3000')

		// replace dorm with the dorm we want to test
		const dorm = 'Maple Hall';

		// fill out the search bar with 'Map'
		cy.get("[placeholder='Search for a dorm']").type(dorm.substring(0, 3));

		// select "Maple Hall"
		cy.contains(dorm).click();

		// check if directed to Maple Hall page
		cy.url().should('include', '/dorms/' + dorm.split(" ").join("-").toLowerCase());
		
	}),

	it('Test for MaMahon Hall, search for "hon" with one result', () => {
		// visiting the main page
		cy.visit('http://localhost:3000')

		// replace dorm with the dorm we want to test
		const dorm = 'McMahon Hall';

		// fill out the search bar with "hon"
		cy.get("[placeholder='Search for a dorm']").type(dorm.substring(4, 7));

		// select "McMahon Hall"
		cy.contains(dorm).click();

		// check if directed to McMahon Hall page
		cy.url().should('include', '/dorms/' + dorm.split(" ").join("-").toLowerCase());
		
	})

	it('Test for Stevens Court, search for "s" with multiple result', () => {
		// visiting the main page
		cy.visit('http://localhost:3000')

		// replace dorm with the dorm we want to test
		const dorm = 'Stevens Court';

		// fill out the form with one letter 's'
		cy.get("[placeholder='Search for a dorm']").type(dorm.substring(0, 1));

		// select Stevens Court
		cy.contains(dorm).click();

		// check if directed to Stevens Court page
		cy.url().should('include', '/dorms/' + dorm.split(" ").join("-").toLowerCase());
		
	})
})