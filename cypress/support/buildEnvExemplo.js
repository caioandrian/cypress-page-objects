const buildEnvExemplo = () => {
    cy.intercept('POST', Cypress.env("exemplo_backend") + '/signin',{
            statusCode: 200,
            body: {
                id:19299,
                nome:"Usuario Falso",
                token:"token que nao deveria ser aceito"
            }
        }
    ).as('signin')

    cy.intercept('GET', Cypress.env("exemplo_backend") + '/saldo',{
            statusCode: 200,
            body: [
                {conta_id: 99999, conta:"Carteira",saldo:"100.00"},
                {conta_id: 66666, conta:"Banco ",saldo:"6000.00"},
                {conta_id: 11111, conta:"Conta para saldo ",saldo:"534.00"}
            ]
        }
    ).as('saldo')

    cy.intercept('GET', Cypress.env("exemplo_backend") + '/contas',{
            statusCode: 200,
            body: [
                {conta_id: 1,nome:"Carteira",visivel: true,usuario_id: 1},
                {conta_id: 2,nome:"Banco",visivel: true,usuario_id: 1},
                {conta_id: 10,nome:"Conta para saldo",visivel: true,usuario_id: 1}
            ]
        }
    ).as('contas')

    cy.intercept('GET', Cypress.env("exemplo_backend") + '/reset',{
        statusCode: 200
    }
    ).as('reset')
}

export default buildEnvExemplo