/// <reference types="cypress" />
import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import {Header_Exemplo} from '../../../pages/exemplo/header'
import {Conta_Exemplo} from '../../../pages/exemplo/contas'
import {Login_Exemplo} from '../../../pages/exemplo/login'

Given(`que esteja com o banco de dados resetado de exemplo`, () => {
    Header_Exemplo.reset_app()
    Header_Exemplo.valida_mensagem_toast('Dados resetados com sucesso!')
})

Given('que esteja logado com uma conta ativa no site de exemplo', () => {
    Login_Exemplo.visitar_pagina()
    Login_Exemplo.fazer_login();
})

Given(`tenha recebido a mensagem de boas vindas no site de exemplo`, () => {
    Header_Exemplo.valida_mensagem_toast_login();
})

When(`criar uma conta com um nome válido de exemplo`, () => {
    Header_Exemplo.acessar_menu_conta();
    Conta_Exemplo.inserir_conta('Carteira')
})

Then(`deverá apresentar a mensagem {string} no site de exemplo`, (msg) => {
    Header_Exemplo.valida_mensagem_toast(msg)
})


Then(`deverá apresentar a mensagem {string} de exemplo`, (msg) => {
    Header_Exemplo.valida_mensagem_toast(msg);
})

Then(`deverá deslogar da conta de exemplo`, () => {
    Header_Exemplo.deslogar()
    Header_Exemplo.valida_mensagem_toast('Até Logo!')
})
