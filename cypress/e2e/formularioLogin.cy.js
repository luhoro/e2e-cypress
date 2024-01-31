describe('Formulário de login', () => {
  beforeEach( () => {
    cy.visit('/')
  })

  it('Deve acessar a página home', () => {
    cy.login('luisa@gmail.com', 'Aa')
    cy.visit('/home')
    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta')
  })

  it('Não deve permitir um e-mail inválido', () => {
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('luisa@gmail')
    cy.getByData('senha-input').type('Aa')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
  })

  it('Não deve permitir o campo email em branco', () => {
    cy.getByData('botao-login').click()
    cy.getByData('senha-input').type('Aa')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  })

  it('Não deve permitir o campo senha em branco', () => {
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('luisa@gmail.com')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo de senha é obrigatório')
  })
})