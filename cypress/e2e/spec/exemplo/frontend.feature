#language: pt

@exemplo
Funcionalidade: Exemplo
    Como cliente da aplicação
    Quero ter uma ou mais contas para movimentação

    Contexto:
        Dado que esteja logado com uma conta ativa no site de exemplo
        E tenha recebido a mensagem de boas vindas no site de exemplo
        E que esteja com o banco de dados resetado de exemplo

    @criar_conta
    Cenário: Criar conta para movimentação de exemplo
        Quando criar uma conta com um nome válido de exemplo
        Então deverá apresentar a mensagem "Conta inserida com sucesso!" no site de exemplo
        E deverá deslogar da conta de exemplo