import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

import buildEnvExemplo from '../../../../cypress/support/buildEnvExemplo'

export class Login_Exemplo extends Base {

    static visitar_pagina(){
        super.visit(Cypress.env("exemplo"))
    }

    static fazer_login(){
        if(Cypress.env('MockRequest')){
            
            buildEnvExemplo()
            // prepara o ambiente com uma "massa de dados" pré-definida de acordo com cada rotas da nossa api
            super.typeElement(el.LOGIN.USER, "usuariofalse")
            super.typeElement(el.LOGIN.PASSWORD, "qualquersenha")
            super.clickElement(el.LOGIN.BTN_LOGIN)
        }else{
            var user = Cypress.env("users").user_exemplo;
            super.typeElement(el.LOGIN.USER, user.email)
            super.typeElement(el.LOGIN.PASSWORD, user.senha)
            super.clickElement(el.LOGIN.BTN_LOGIN)
        }
    }
    
}

