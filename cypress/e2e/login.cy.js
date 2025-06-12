/// <reference types="cypress" />

const base_url = "http://localhost:3000/";

describe('Login', () => {
    it('should login successfully', () => {
        cy.visit(`${base_url}login`)
        cy.get('input[name=email]').type('admin@example.com')
        cy.get('input[name=password]').type('123456')
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/clientes')
    });
});
