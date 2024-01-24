/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    }),
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longtext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec diam eu nulla fermentum varius. Vestibulum euismod eros vel urna consequat, et tincidunt lacus fringilla. In hac habitasse platea dictumst. Aenean vel risus vel ipsum sagittis interdum eu at libero. Aliquam erat volutpat. Duis sit amet justo id elit venenatis efficitur. Nullam sit amet velit ac nisi vulputate congue. Sed nec facilisis dolor. Suspendisse potenti. Vivamus vel augue sed purus dapibus iaculis.'
        cy.get('#firstName')
            .type('Matheus')
        cy.get('#lastName')
            .type('Kallenbach')
        cy.get('#email')
            .type('araujo.kallenbach@gmail.com')
        cy.get('#open-text-area')
            .type(longtext, { delay: 0 })
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    }),
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName')
            .type('Matheus')
        cy.get('#lastName')
            .type('Kallenbach')
        cy.get('#email')
            .type('araujo.kallenbach@gmail,com')
        cy.get('#open-text-area')
            .type('teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    }),
    it('Valida que o campo telefone só aceita números', function(){
        cy.get('#phone')
        .type('abc')
        .should('have.value', '')
    }),
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#phone-checkbox')
            .check();
        cy.get('#firstName')
            .type('Matheus')
        cy.get('#lastName')
            .type('Kallenbach')
        cy.get('#email')
            .type('araujo.kallenbach@gmail.com')
        cy.get('#open-text-area')
            .type('teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    }),
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Matheus')
            .should('have.value', 'Matheus')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Kallenbach')
            .should('have.value', 'Kallenbach')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('araujo.kallenbach@gmail.com')
            .should('have.value', 'araujo.kallenbach@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('51995087130')
            .should('have.value', '51995087130')
            .clear()
            .should('have.value', '')
    }),
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    }),
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    }),
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    }),    
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    }),
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(2)
            .should('have.value', 'cursos')
    }),
    it('marca o tipo de atendimento "Feedback"', function (){
        cy.get('input[type = "radio"][value="elogio"]')
            .check()
            .should('be.checked')     
    }),
    it('marca cada tipo de atendimento', function (){
        cy.get('input[type = "radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')  
            })
    }),
    it('marca ambos checkboxes, depois desmarca o último', function (){
        cy.get('input[type = "checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    }),

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[type = "checkbox"]')
            .check()
            .should('be.checked')

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error')
         .should('be.visible')
    }),
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    }),
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input){
             expect($input[0].files[0].name).to.equal('example.json')
            })
    }),
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input){
             expect($input[0].files[0].name).to.equal('example.json')
            })
    }),
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    }),
    it('exibe mensagem erro por 3 segundos', function() {
        cy.clock() 
        cy.contains('button', 'Enviar')
        .click()
        cy.get('.error')
        .should('be.visible')
        cy.tick(3000)
        cy.get('.error')
        .should('not.be.visible')
      }),
      Cypress._.times(5, () => {
      it('exibe mensagem erro por 3 segundos', function() {
        cy.clock() 
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
        cy.tick(3000)
        cy.get('.success')
        .should('not.be.visible')
      })
    }),
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      }), 
    it('preenche a area de texto usando o comando invoke', function(){
        cy.get('#open-text-area')
            .invoke('val', 'Teste')
            .should('have.value' , 'Teste')
    }), 
    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const { status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    }),
    it('Mostra o gato invisivel', function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    })
})
