describe('Tela de Cadastro de Corredor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/corredor'); // ou a rota onde seu front está rodando
  });

  it('Deve mostrar mensagem de erro ao enviar com campos vazios', () => {
    cy.get('input[type="submit"]').click();
    cy.contains('Por favor, preencha todos os campos obrigatórios.').should('exist');
  });

  it('Deve mostrar erro com CPF inválido', () => {
    cy.get('#nm_corredor').type('João da Silva');
    cy.get('#cpf_corredor').type('12345678900');
    cy.get('#tamanho_blusa').select('M');
    cy.get('input[type="submit"]').click();

    cy.contains('CPF inválido').should('exist');
  });

  it('Deve cadastrar corretamente com dados válidos', () => {
    cy.get('#nm_corredor').type('Maria Oliveira');
    cy.get('#cpf_corredor').type('123.456.789-00');
    cy.get('#tamanho_blusa').select('P');

    // intercepta a chamada ao backend e verifica se foi feita
    cy.intercept('POST', 'http://localhost:3000/corredor/corredor').as('postCorredor');

    cy.get('input[type="submit"]').click();

    cy.wait('@postCorredor').its('response.statusCode').should('eq', 200);
    cy.contains('Corredor cadastrado com sucesso!').should('exist');
  });
});
