Cypress.Commands.add('getByData', (seletor) => {
  return cy.get(`[data-test=${seletor}]`)
})

Cypress.Commands.add('verifyText', (seletor, text) => {
  cy.get(`${seletor}`).contains(`${text}`)
})

Cypress.Commands.add('login', (email, senha) => {
  cy.session([email, senha], () => {
    cy.visit('/')
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type(email)
    cy.getByData('senha-input').type(senha)
    cy.getByData('botao-enviar').click()
    cy.url().should('contains', '/home')
  })
})