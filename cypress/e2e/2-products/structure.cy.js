/// <reference types="cypress" />
import '../../support/commands.ts';


describe("Structure", () => {
    beforeEach(() => {
        cy.intercept('GET', '**/structure?page=1&size=10').as('getStructure')

        cy.login("admin@example.com", "123456");
        cy.get('.justify-between > .flex-col').click()
        cy.get('[href="/produtos/estrutura"]').click()

        cy.wait('@getStructure', { timeout: 10000 }).then((interception) => {
            expect([200, 201, 307]).to.include(interception.response?.statusCode)
        })
    })

    it("should create a structure successfully", () => {
        cy.intercept('POST', '**/structure').as('createStructure')

        cy.get('.bg-primary').click()
        cy.get('input[name=name]').type("teste cypress")
        cy.get('input[name=price]').type("10.00")
        cy.get('button[type="submit"]').click()
        
        cy.wait('@createStructure', { timeout: 10000 }).then((interception) => {
            expect([200, 201, 307]).to.include(interception.response?.statusCode)
        })
        
        cy.contains('.text-center', 'ID').click()
        cy.contains('[role="menuitem"]', 'Desc').click()
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('have.text', 'teste cypress')
    })
    
    it("should update a structure successfully", () => {
        cy.intercept('PUT', '**/structure/**').as('updateStructure')
        
        cy.contains('.text-center', 'ID').click()
        cy.contains('[role="menuitem"]', 'Desc').click()

        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('have.text', 'teste cypress')
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(2).should('have.text', '10')
        
        cy.get('tbody[data-slot="table-body"] tr:first-child td:last-child button').click();
        cy.contains('[role="menuitem"]', 'Editar').click()
        
        cy.get('input[name=name]').type("teste cypress 2")
        cy.get('input[name="price"]').clear()
        cy.get('input[name=price]').type("20.00")
        cy.get('button[type="submit"]').click()
        
        cy.wait('@updateStructure', { timeout: 10000 }).then((interception) => {
            expect([200, 201, 307]).to.include(interception.response?.statusCode)
        })
        
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('have.text', 'teste cypress 2')
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(2).should('have.text', '20')
    })
    
    it("should delete a structure successfully", () => {
        cy.contains('.text-center', 'ID').click()
        cy.contains('[role="menuitem"]', 'Desc').click()
        
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('have.text', 'teste cypress 2')
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(2).should('have.text', '20')
        
        cy.get('tbody[data-slot="table-body"] tr:first-child td:last-child button').click();
        cy.contains('[role="menuitem"]', 'Excluir').click()
        cy.contains('button[type="submit"]', 'Excluir').click()
        
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('not.have.text', 'teste cypress 2')
    })
});