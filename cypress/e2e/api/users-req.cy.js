describe('Realizando requisições para a API', () => {
  context('GET /users', () => {
    it('Deve retornar uma lista de usuários', () => {
      cy.request('GET', 'http://localhost:8000/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).length.to.be.greaterThan(1);
      });
    });
  });

  context('GET /users/:userID', () => {
    it('Deve retornar um único usuário', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/dd7a79e2-3b67-480a-93a5-8ffb909f79bb',
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('nome');
      });
    });

    it('Deve retornar um erro quando o usuário for inválido', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/dd7a79e2-3b67-480a-93a5',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.eq('Not Found');
      });
    });
  });

  context('Interceptando solicitações de rede', () => {
    it('Deve fazer a interceptação do POST users/login', () => {
      cy.intercept('POST', 'users/login').as('loginRequest');
      cy.login('luisa@gmail.com', 'Aa');
      cy.wait('@loginRequest').then((interception) => {
        interception.response = {
          statusCode: 200,
          body: {
            sucess: true,
            message: 'Login bem sucedido!',
          },
        };
      });
      cy.visit('/home');

      cy.getByData('titulo-boas-vindas').should(
        'contain.text',
        'Bem vindo de volta!'
      );
    });
  });
});