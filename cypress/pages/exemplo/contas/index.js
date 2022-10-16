import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Conta_Exemplo extends Base{

    static inserir_conta(nomeConta){
        if(Cypress.env('MockRequest')){
            cy.intercept('POST', Cypress.env("exemplo_backend") + '/contas',{
                statusCode: 201,
                fixture: 'exemplo/mock/post_response_conta_valida.json'
            }).as('postConta')
    
            cy.intercept('GET', Cypress.env("exemplo_backend") + '/contas',{
                fixture: 'exemplo/mock/get_response_contas_atualizadas.json'
            }).as('contas Atualizadas')
        }
        
        super.typeElement(el.CONTAS.NOME,nomeConta)
        super.clickElement(el.CONTAS.BTN_SALVAR)
    }

    static editar_uma_conta(nomeConta){
        super.getElementByXPath(el.CONTAS.FN_XP_BTN_ALTERAR(nomeConta)).click()
        super.clickElement(el.CONTAS.BTN_SALVAR)
    }
}

