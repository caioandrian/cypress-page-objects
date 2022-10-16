# Cypress com Page Objects e BDD

Esta documentação tem como objetivo auxiliar na compreensão da arquitetura do framework de automação, bem como dos padrões arquiteturais específicos do projeto.

**Seções:**

 [Cypress com Page Objects e BDD](#cypress-com-page-object-e-bdd)
  - [Instalação e Execução do Projeto](#instalação-e-execução-do-projeto)
    - [Instalação NodeJs](#instalação-nodejs)
    - [Instalação Visual Studio Code](#instalação-visual-studio-code)
    - [Execução do Projeto](#execução-do-projeto)
      - [Extensões](#extensões)
  - [Sobre Padrão Page Object](#sobre-padrão-page-object)
  - [Arquitetura do projeto e framework de automação](#arquitetura-do-projeto-e-framework-de-automação)
   
   
## Instalação e Execução do Projeto

Para realizar nossa automação, usamos o Cypress que é um framework de automação de testes E2E que usa como base o Javascript para a escrita do seu código. Com ele é possível configurar, escrever, rodar e debuggar os testes de forma simples e prática.

Para utilizar o Cypress, é necessário realizar as seguintes instalações:

- NodeJs (versão LTS)
- Visual Studio Code
- Cypress

### Instalação NodeJs

**1**. Acessar página <https://nodejs.org/en/> e recomenda-se baixar a versão mais estável;
**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, nos botões de _Install_ e _Finish_.
**Pronto, o NodeJs foi instalado!**

### Instalação Visual Studio Code

**1**. Acessar https://code.visualstudio.com/download e baixar a versão para Windows;

**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, no botão de _Finish_.
O Visual Studio Code abrirá automaticamente e pronto.
**Instalação concluída!**

### Instalação do Android Studio

**1**. Acessar https://developer.android.com/studio e baixar a versão para Windows;

**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, no botão de _Finish_.
**Instalação concluída!**

### Execução do Projeto

**1**. Dentro do VScode, abrir a pasta clonada, acessar a raiz do projeto e executar no terminal o comando ```npm install```;

> Isso fará com que, na nossa estrutura de pastas, seja criado um _node_modules_ com várias dependências, incluindo o _cypress_.

**2**. A próxima etapa é executar o comando ``` npm run cy:open ou npm run cy:run-exemplo```.

**Pronto!** 

#### Extensões do Visual Studio

Abaixo seguem alguns plugins que nos auxiliam na nossa automação. São eles:

- JavaScript (ES6) code snippets
- Commit Message Editor - **Formatador de commits**
- Markdown Preview Enhanced - **Visualizador de arquivos .md**
- Prettier - Code formatter - **Formatador de código**
- Material Icon Theme
- Cucumber (Gherkin) Full Support
- Snippets and Syntax Highlight for Gherkin (Cucumber)
- Bracket Pair Colorizer 2
- ES6 Mocha Snippets

## Entendendo o Padrão Page Object 

O padrão Page Objects é muito utilizado nos projetos de automação de testes como uma forma de organizar melhor nosso código.

Ele serve para separar responsabilidades, ou seja:

- Vamos ter um local onde ficará descrita a **ação** da página que estamos trabalhando.

- E um outro local para os **elementos** dessa página.

Resumidamente, ao usar o Page Objects, estamos construindo uma classe para cada página de testes.

Esses são os passos necessários para usar o padrão Page Objects no nosso projeto!

####Vantagens de usar Page Objects:

Dentro as muitas vantagens, podemos destacar:
- Padronização;
- Organização;
- Independência dos testes;
- Evita duplicação de código;
- Fácil de manter;
- Seletores de elementos em um único lugar.

## Arquitetura do projeto e framework de automação

- **config**: Arquivos de configurações para teste local, browserstack, lambdatest e saucelabs
<p>

- **web**: Para teste em navegador no mobile
<p>

- **app**: Para teste em APP no mobile
<p>

- **app_android_studio**: Para teste em APP no mobile
<p>

- **e2e**: Para teste em APP no mobile
  - spec - Features com cenários em BDD
  - steps_definitions - Lista de métodos/steps que estão associados ao BDD.
<p>

- **fixtures**: Arquivos de massas a serem usadas na automação, sendo estáticas ou dinâmicas.
  - json (arquivos no formato json, txt, excel, etc)
  - factory (classe para construção de massa de dados dinâmica)
  - images
  - mock (arquivos para serem utilizados sem necessidade de conexão com o banco de dados real)
<p>

- **Pages**: Representa abstração de páginas, com métodos e seus elementos. Fica definida  as seguintes convenções:
  <br>
  - Pasta com o nome da página
  - - elements.js - lista de seletores usados na página
  - - index.js - lista de métodos usados nos cenários dessa página
