describe('Testando múltiplas páginas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve conseguir acessar a página de cartôes', {browser: 'edge'}, () => {
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('luisa@gmail.com')
    cy.getByData('senha-input').type('Aa')
    cy.getByData('botao-enviar').click()

    cy.location('pathname').should('eq', '/home')

    cy.getByData('app-home').find('a').eq(1).click()
    cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')

    cy.location('pathname').should('eq', '/home/cartoes')
  })
})