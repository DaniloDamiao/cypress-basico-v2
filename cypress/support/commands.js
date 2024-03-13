Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    
    cy.clock()

    cy.get('#firstName').type('Danilo')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('danilo@teste.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('.button', 'Enviar').click()

});