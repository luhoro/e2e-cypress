describe('Formulário cadastro', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // it('Usuário deve conseguir se cadastrar com sucesso', () => {
  //   cy.getByData('botao-cadastro').click()
  //   cy.getByData('nome-input').type('Bianca')
  //   cy.getByData('email-input').type('Bianca@gmail.com')
  //   cy.getByData('senha-input').type('senha')
  //   cy.getByData('botao-enviar').click({force: true})
  //   cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
  // })

  it('Não deve permitir o cadastro de usuários sem digitar o nome', () => {
    cy.getByData('botao-cadastro').click()
    cy.getByData('email-input').type('moni@alura.com')
    cy.getByData('senha-input').type('987654')
    cy.getByData('botao-enviar').click({force: true})
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo de nome é obrigatório')
  })
})