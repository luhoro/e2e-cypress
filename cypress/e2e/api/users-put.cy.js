describe('Teste método PUT da API Usuários', () => {
  it('Atualiza informações do usuário com sucesso', () => {
    const usuario = {
      nome: 'Luisa',
      senha: 'Aa',
    };

    cy.request({
      method: 'PUT',
      url: 'http://localhost:8000/users/dd7a79e2-3b67-480a-93a5-8ffb909f79bb',
      body: usuario,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nome).to.eq(usuario.nome);
      expect(response.body.senha).to.eq(usuario.senha);
    });
  });

  it('Retorna erro 404 para usuário inexistente', () => {
    const usuario = {
      nome: 'Nome Inválido',
      senha: 'Aa',
    };

    cy.request({
      method: 'PUT',
      url: 'http://localhost:8000/users/calopsita',
      body: usuario,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.eq('Not Found');
    });
  });
});