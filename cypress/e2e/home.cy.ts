/**
    Find 10 different methods to add to your project for cypress testing and describe each of them (make sure these are added to your cypress in your project):

    1.	be.visible - checks whether a particular element is visible. *DONE
    2.	have.attr - checks the specific attribute on an HTML element. *DONE
    3.	not.be.empty - checks if the element does not have an empty value. *DONE
    4.	cy.get('a:contains("name")') - targets a spcific element that contains a specific name/word. *DONE 
    5.	exist - checks whether at least one element matches the selector exists.
    6.	cy.viewport - checks the screen size of your website.
    7.	have.length - checks the number of elements of the selected element.
    8.	title/eq - checks to match the property of title with the expected outcome example:cy.title().should('eq', 'Jerry On')
    9.	click - checks to click a link  example:cy.get("[href*='about']").click()
    10.	find - checks to find a specific selector example:cy.get('main').find('footer')
*/

describe('Home Page', () => {
	beforeEach(function() {
        console.log('Starting Home Page Test');
    })

// exist - checks whether at least one element matches the selector exists.
    it('should display the ChooseCity component', () => {
      
        cy.contains('h5', 'CHOOSE A CITY').should('exist');
      
        cy.get('.choose-city-container').should('exist'); 
    });
	it('should display a header, footer, image, h1, and 2 nav links on the home page', () => {
		cy.visit('http://localhost:3000');
        // test for header
        cy.get('header').should('be.visible');
        // test for footer
        cy.get('footer').should('be.visible');
		// test for image
        cy.get('img').should('be.visible').and('have.attr', 'src').should('not.be.empty');
        // test for h1
        cy.get('h1').should('include.text', 'Metro Vancouver');
        // test for 2 nav links
        cy.get('a:contains("Home")').should('be.visible');
        cy.get('a:contains("Statistics")').should('be.visible');
	})
})
//	cy.viewport
it('should have correct padding on medium screens', () => {
    cy.viewport(650, 800); 
    cy.get('.home__container').should('have.css', 'padding', '40px'); 
});

it('should have correct padding on small screens', () => {
    cy.viewport(450, 800); 
    cy.get('.home__container').should('have.css', 'padding', '25px');
});

// what link should i use for this one ?
it('should navigate to the about page when the link is clicked', () => {
    cy.get("[href*='about']").click();
    
});