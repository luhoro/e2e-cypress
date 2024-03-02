describe('Realizando transações', () => {
  const novaTransacao = {
    tipoTransacao: 'Depósito',
    valor: '100',
  };

  it.only('Deve permitir que usuário acesse a aplicação, realize transações e faça um logout', () => {
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

      // ******TESTANDO A API******
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

  // it('Permitir que o usuário acesse a aplicação, realize uma transação e faça um logout na aplicação', () => {
  //   cy.getByData('botao-login').click();
  //   cy.getByData('email-input').type('luisa@gmail.com');
  //   cy.getByData('senha-input').type('Aa');
  //   cy.getByData('botao-envia').click();

  //   cy.location('pathname').should('eq', '/home');

  //   cy.getByData('select-opcoes').select('Transferência');
  //   cy.getByData('form-input').type('80');
  //   cy.getByData('realiza-transacao').click();

  //   cy.getByData('lista-transacoes').find('li').last().contains('- R$ 80');

  //   cy.getByData('botao-sair').click();
  //   cy.location('pathname').should('eq', '/');
  // });

  // it('Deve permitir que o usuário faça o seu cadastro, realize login na aplicação, realize uma transação e faça um logout', () => {
  //   cy.getByData('botao-cadastro').click();
  //   cy.getByData('nome-input').type('Alexandre de Morais');
  //   cy.getByData('email-input').type('alexandre@gmail.com');
  //   cy.getByData('senha-input').type('456789');
  //   cy.getByData('botao-enviar').click();

  //   cy.getByData('mensagem-sucesso')
  //     .should('exist')
  //     .and('have.text', 'Usuário cadastrado com sucesso!');
  //   cy.location('pathname').should('eq', '/');

  //   cy.getByData('botao-login').click();
  //   cy.getByData('email-input').type('alexandre@gmail.com');
  //   cy.getByData('senha-input').type('456789');
  //   cy.getByData('botao-enviar').click();

  //   cy.location('pathname').should('eq', '/home');
  // });
});

describe('Testa informações de um usuário específico', () => {
  it('Verifica informações de usuário, como transações, saldo, nome, etc', () => {
    cy.fixture('dadosUsuario').then((usuario) => {
      cy.login(usuario.email, usuario.senha);
      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuario.nome).should('be.visible');
      cy.getByData('lista-transacoes')
        .find('li')
        .last()
        .contains(usuario.transacoes[usuario.transacoes.length - 1].valor);

      cy.get('[data-testid="saldo"]').contains(usuario.saldo);
    });
  });
});
