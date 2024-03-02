import { fakerPT_BR as faker } from '@faker-js/faker';

describe('Atualização de dados do usuário', () => {
  const novosDadosUsuario = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };

  it('Deve permitir o usuário atualizar seus dados', () => {
    cy.fixture('usuarios').as('usuarios');
    cy.get('@usuarios').then((usuario) => {
      cy.login(usuario[0].email, usuario[0].senha);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuario[0].nome).should('be.visible');
      cy.getByData('app-home').find('a').eq(1).click();
      cy.url().should('include', '/minha-conta');
      cy.getByData('botao-salvar-alteracoes').should('be.disabled');

      cy.get('[name = "nome"]').type(novosDadosUsuario.nome);
      cy.get('[name = "senha"]').type(novosDadosUsuario.senha);
      cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');
      cy.getByData('botao-salvar-alteracoes').click();

      cy.on('window:alert', (textoAlert) => {
        expect(textoAlert).to.equal('Alterações salvas com sucesso!');
      });

      cy.url().should('include', '/home');

      cy.window().then( win => {
        expect(win.localStorage.getItem('nomeUsuario')).to.equal(
          novosDadosUsuario.nome
        )

        const userid = win.localStorage.getItem('userId')
        cy.request('GET', `http://localhost:8000/users/${userid}`).then( res => {
          expect(res.status).to.eq(200)
          expect(res.body.nome).to.be.equal(novosDadosUsuario.nome)
          expect(res.body.senha).to.be.equal(novosDadosUsuario.senha)
        })
      })
    });
  });
});

describe('Realizando transações', () => {
  const novaTransacao = {
    tipoTransacao: 'Depósito',
    valor: '100',
  };

  it('Deve permitir que usuário acesse a aplicação, realize transações e faça um logout', () => {
    cy.fixture('dadosUsuario').as('usuario');
    cy.get('@usuario').then((usuario) => {
      cy.login(usuario.email, usuario.senha);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuario.nome).should('be.visible');

      cy.getByData('titulo-boas-vindas').should(
        'contain',
        'Bem vindo de volta!'
      );

      cy.getByData('select-opcoes').select(novaTransacao.tipoTransacao);
      cy.getByData('select-opcoes').should(
        'have.value',
        novaTransacao.tipoTransacao
      );

      cy.getByData('form-input').type(novaTransacao.valor);
      cy.getByData('form-input').should('have.value', novaTransacao.valor);
      cy.getByData('realiza-transacao').click();


      cy.getByData('lista-transacoes')
        .find('li')
        .last()
        .contains(novaTransacao.valor);


      cy.window().then((win) => {
        const userId = win.localStorage.getItem('userId');

        cy.request({
          method: 'GET',
          url: `http://localhost:8000/users/${userId}/transations`,
          failOnStatusCode: false,
        }).then((resposta) => {
          expect(resposta.status).to.eq(200);
          expect(resposta.body).is.not.empty;
          expect(resposta.body).to.have.lengthOf.at.least(1);
          expect(resposta.body[resposta.body.length - 1]).to.deep.include(
            novaTransacao
          );
        });
      });

      cy.getByData('botao-sair').click();
      cy.url().should('include', '/');


      cy.getByData('titulo-principal').contains(
        'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!'
      );
    });
  });
});