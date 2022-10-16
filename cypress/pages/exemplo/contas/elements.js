export const ELEMENTS = {
    CONTAS:{
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: (nome) => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    }
}
