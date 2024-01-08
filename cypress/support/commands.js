Cypress.Commands.add('getByData', (seletor) => {
  return cy.get(`[data-test=${seletor}]`)
})

Cypress.Commands.add('verifyText', (seletor, text) => {
  cy.get(`${seletor}`).contains(`${text}`)
})