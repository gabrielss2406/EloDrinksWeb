/// <reference types="cypress" />
import '../../support/commands.ts';


describe("Discount", () => {
    beforeEach(() => {
        cy.intercept('GET', '**/product?page=1&size=10').as('getProducts')

        cy.login("admin@example.com", "123456");
        cy.get('.justify-between > .flex-col').click()
        cy.get('[href="/produtos"]').click()

        cy.wait('@getProducts', { timeout: 10000 }).then((interception) => {
            expect([200, 201, 307]).to.include(interception.response?.statusCode)
        })
    })

    it("should create a sale successfully", () => {
        cy.intercept('POST', '**/product').as('createProducts')

        cy.get('.bg-primary').click()
        cy.get('input[name=name]').type("teste cypress")
        cy.get('input[name=price]').type("10")
        cy.get('input[placeholder="Digite uma nova categoria"]').type("cypress test")
        cy.get('button[type="submit"]').click()

        cy.wait('@createProducts', { timeout: 10000 }).then((interception) => {
            expect([200, 201, 307]).to.include(interception.response?.statusCode)
        })

        cy.contains('.text-center', 'ID').click()
        cy.contains('[role="menuitem"]', 'Desc').click()
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('have.text', 'teste cypress')
    })

    it("should update a sale successfully", () => {
        cy.intercept('PUT', '**/product/**').as('updateProducts')

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

        cy.wait('@updateProducts', { timeout: 10000 }).then((interception) => {
            expect([200, 201, 307]).to.include(interception.response?.statusCode)
        })

        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(1).should('have.text', 'teste cypress 2')
        cy.get('tbody[data-slot="table-body"] tr').first().find('td').eq(2).should('have.text', '20')
    })

    it("should delete a sale successfully", () => {
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