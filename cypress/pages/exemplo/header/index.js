import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Header_Exemplo extends Base{

    static acessar_menu_conta(){
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.CONTAS)
        })
    }

    static acessar_menu_home(){
        super.clickElement(el.MENU.HOME)
    }

    static acessar_menu_extratos(){
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.EXTRATO)
        })
    }

    static acessar_menu_movimentacao(){
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.MOVIMENTACAO)
        })
    }

    static valida_mensagem_toast_login(){
        super.explicitWait(2000)

        if(Cypress.env('MockRequest'))
            super.validateElementInnerText(el.MESSAGE, "Bem vindo, Usuario Falso!")
        else
            super.validateElementInnerText(el.MESSAGE, "Bem vindo, Caio!")
        
        super.clickElement(el.BTN_CLOSE_MESSAGE)
    }

    static valida_mensagem_toast(texto){
        super.explicitWait(2000)
        super.validateElementInnerText(el.MESSAGE, texto)
        super.clickElement(el.BTN_CLOSE_MESSAGE)
    }

    static reset_app(){
        super.explicitWait()
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.RESETAR)
        })
    }

    static deslogar(){
        super.explicitWait()
        super.clickElement(el.MENU.SETTINGS).then( () => {
            super.clickElement(el.MENU.SAIR)
        })
    }
}

