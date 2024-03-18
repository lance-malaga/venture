/**
    Find 10 different methods to add to your project for cypress testing and describe each of them (make sure these are added to your cypress in your project):

    1.	be.visible - checks whether a particular element is visible. *DONE
    2.	have.attr - checks the specific attribute on an HTML element. *DONE
    3.	not.be.empty - checks if the element does not have an empty value. *DONE
    4.	cy.get('a:contains("name")') - targets a spcific element that contains a specific name/word. *DONE 
    5.	exist - checks whether at least one element matches the selector exists. *DONE
    6.	cy.viewport - checks the screen size of your website.  *DONE
    7.	have.length - checks the number of elements of the selected element.  *DONE
    8.	title/eq - checks to match the property of title with the expected outcome example:cy.title().should('eq', 'Jerry On')  *DONE 
    9.	click - checks to click a link  example:cy.get("[href*='about']").click() *DONE
    10.	find - checks to find a specific selector example:cy.get('main').find('footer') *DONE
*/

describe('Home Page', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        console.log('Starting Home Page Test');
    });

    // Test to check the visibility of various elements on the home page 1, 2, 3, 4
    it('should display a header, footer, image, h1, and 2 nav links on the home page', () => {
        cy.get('header').should('be.visible');
        cy.get('footer').should('be.visible');
        cy.get('img').should('be.visible').and('have.attr', 'src').should('not.be.empty');
        cy.get('a:contains("Home")').should('be.visible');
        cy.get('a:contains("Statistics")').should('be.visible');
    });

    // 5. exist - checks whether at least one element matches the selector exists.
    it('should display the ChooseCity component with city options', () => {
        cy.contains('CHOOSE A CITY').should('exist');
    });
     //  6.	cy.viewport - checks the screen size of your website.  *DONE
     describe('Responsive Padding', () => {
        it('should have correct padding on small screens', () => {
          // Set the viewport to 450px by 800px to trigger the CSS media query
          cy.viewport(450, 800);
          
          // Assuming that the title is "Venture", resulting in "City Of Venture / Metro Vancouver" in the <h1>
          cy.contains('h1', 'City Of Venture / Metro Vancouver').closest('[class*="home__container"]').should('have.css', 'padding', '25px');
        });
      });
      

    //   7. have.length - checks the number of elements of the selected element.
    it('should display two navigation links', () => {
        cy.get('header a').should('have.length', 3);
    });

    //   8.	title/eq - checks to match the property of title with the expected outcome example:cy.title().should('eq', 'Jerry On')  
    it('has the correct page title', () => {
        cy.title().should('eq', 'Venture | Home Page');

    });

    //   9.  Test to ensure navigation links work correctly
it('navigates to the Statistics page when clicking the Statistics link', () => {
    cy.get('a:contains("Statistics")').click();
    cy.url().should('include', '/statistics'); 
});

    //   10.	find - checks to find a specific selector example:cy.get('main').find('footer')
    
    it('should find the footer element on the page', () => {
        cy.get('footer').should('exist');
    });
});

