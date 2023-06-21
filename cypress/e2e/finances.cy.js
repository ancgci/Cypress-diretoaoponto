

describe('Transações', () => {

    beforeEach(() => {
        cy.visit("https://devfinance-agilizei.netlify.app/")
    });
    
    it('Cadastrar uma entrada', () => {
        
        criarTransacao("Freela", 10000)
        
        cy.get("tbody tr .description").should("have.text", "Freela")  
       
    });

    it('Cadastrar uma saída', () => {
        
        criarTransacao("Cinemark", -300)

        cy.get("tbody tr .description").should("have.text", "Cinemark")
    });
    
    it('Excluir transação', () => {
        
        criarTransacao("Freela2", 50000)
        criarTransacao("Mesada",  3000)

        // cy.get("tbody tr .description").should("have.text", "Freela2")   
        //    .parent()
        //    .find('img')
        //    .click()

        cy.contains(".description", "Freela2")
           .siblings()
           .children('img')
           .click()
   
        cy.get('tbody tr').should("have.length", 1)
    });
});

function criarTransacao(descricao, valor) {
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-06-15") // yyyy-mm-dd

    cy.contains('button', 'Salvar').click()
}