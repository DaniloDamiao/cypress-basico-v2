// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types = "cypress"/>

describe('Aula 2 - Exercicio 01 - Central de Atendimento ao Cliente TAT', function () {
    
    beforeEach(function () {
        //carrega a pagina do site a visitar. 
        cy.visit('./src/index.html')
    });
    
    it('verifica o título da aplicação', function () {
        //valida o titulo da pagina carregada.    
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });
    
    it('Aula 2 - Exercicio Extra 01 - preenche os campos obrigatórios e envia o formulário', function () {
        
        let longtext = 'Teste teste teste teste teste teste'

        cy.get('#firstName').type('Danilo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danilo@teste.com.br')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        
    });

    it('Aula 2 - Exercicio Extra 02 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName').type('Danilo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danilo#teste.com.b')
        cy.get('#open-text-area').type('teste')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('Aula 2 - Exercicio Extra 03 - campo telefone continua vazio quando preenchido com o valor não númerico', function () {
        cy.get('#phone')
            .type('Abcdefghij')
            .should('have.value', '')
    });

    it('Aula 2 - Exercicio Extra 04 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        
        cy.get('#firstName').type('Danilo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danilo#teste.com.b')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    });
    
    it('Aula 2 - Exercicio Extra 05 - preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('#firstName').type('Danilo').should('have.value', 'Danilo')
            .clear().should('have.value', '')
        
        cy.get('#lastName').type('Santos').should('have.value', 'Santos')
            .clear().should('have.value', '')
        
        cy.get('#email').type('danilo@teste.com.br').should('have.value', 'danilo@teste.com.br')
            .clear().should('have.value', '')
        
        cy.get('#phone').type('1234567890').should('have.value', '1234567890')
            .clear().should('have.value', '')
    });

    it('Aula 2 - Exercicio Extra 06 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });
    it('Aula 2 - Exercicio Extra 06 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit(),
        
        cy.get('.success').should('be.visible')
        
    });

    it('Aula 3 - Exercicio 01 - seleciona um produto (YouTube) por seu texto', function (){
        
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        
    });
    it('Aula 03 - Exercicio Extra 01 - seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('Aula 03 - Exercício Extra 02 - seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('Aula 04 - Exercício 01 - marca o tipo de atendimento "Feedback"', function() {
        
        cy.get('[type="radio"][value=feedback]')
            .check('feedback')
            .should('have.value', 'feedback')
    });
    it('Aula 04 - exercício Extra 01 - marca cada tipo de atendimento ', function () {
        
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
        })  
    });

    it('Aula 05 Exercício 01 - marca ambos checkboxes, depois desmarca o último', function () {

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('Aula 06 Exercício 01 - seleciona um arquivo da pasta fixtures ', function () {
        
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) { 
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Aula 06 Exercício Extra 01 - seleciona um arquivo simulando um drag-and-drop', function () {
        
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
            .should(function($input) { 
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Aula 06 Exercício Extra 02 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value', 'samplefile')
            .selectFile('@samplefile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Aula 07 Exercício 01 - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        //validando o atributo target _blank
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    });

    it('Aula 07 Exercício Extra 01 - acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
    });    
})