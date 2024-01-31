describe('Menu de navegação do ícone hamburguer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Resolução do iphone xr', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    it('Deve existir um menu hambúrguer', () => {
      cy.getByData('botao-login').click();
      cy.getByData('email-input').type('luisa@gmail.com');
      cy.getByData('senha-input').type('Aa');
      cy.getByData('botao-enviar').click();

      cy.location('pathname').should('eq', '/home');

      cy.getByData('menu-burguer').should('be.visible');
    });
  });

  context('Resolução do mackbook 13', () => {
    beforeEach(() => {
      cy.viewport('macbook-13');
    });

    it('Não deve existir um botão menu burguer', () => {
      cy.visit('/');

      cy.getByData('botao-login').click();
      cy.getByData('email-input').type('luisa@gmail.com');
      cy.getByData('senha-input').type('Aa');
      cy.getByData('botao-enviar').click();

      cy.location('pathname').should('eq', '/home');

      cy.getByData('menu-burguer').should('not.be.visible');
    });
  });
});
