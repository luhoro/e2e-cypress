import { fakerPT_BR as faker } from '@faker-js/faker';

describe('Formulário cadastro', () => {
  const novosDadosUsuario = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };

  beforeEach(() => {
    cy.visit('/')
  })

  it('Usuário deve conseguir se cadastrar com sucesso', () => {
    cy.getByData('botao-cadastro').click()
    cy.getByData('nome-input').type(novosDadosUsuario.nome)
    cy.getByData('email-input').type(novosDadosUsuario.email)
    cy.getByData('senha-input').type(novosDadosUsuario.senha)
    cy.getByData('botao-enviar').click({force: true})
    cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
  })

  it('Não deve permitir o cadastro de usuários sem digitar o nome', () => {
    cy.getByData('botao-cadastro').click()
    cy.getByData('email-input').type(novosDadosUsuario.email)
    cy.getByData('senha-input').type(novosDadosUsuario.senha)
    cy.getByData('botao-enviar').click({force: true})
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo de nome é obrigatório')
  })
})