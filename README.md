# Automação QA

Esta documentação tem como objetivo auxiliar na compreensão da arquitetura do framework de automação, bem como dos padrões arquiteturais específicos do projeto e práticas específicas da Squad QA da UOL Edtech.

**Seções:**

 [Automação QA](#automação-qa)
  - [Instalação e Execução do Projeto](#instalação-e-execução-do-projeto)
    - [Instalação NodeJs](#instalação-nodejs)
    - [Instalação Visual Studio Code](#instalação-visual-studio-code)
    - [Execução do Projeto](#execução-do-projeto)
      - [Extensões](#extensões)
  - [Clean Code (Javascript)](#clean-code-javascript)
  - [Sobre Padrão Page Object](#sobre-padrão-page-object)
  - [GitFlow](#gitflow)
    - [Processo de Desenvolvimento](#processo-de-desenvolvimento)
      - [Processo de Desenvolvimento Local](#processo-de-desenvolvimento-local)
      - [Processo de Desenvolvimento Remoto](#processo-de-desenvolvimento-remoto)
      - [Exemplo Prático](#exemplo-prático)
      - [Normas](#normas)
        - [Padrões na criação de Branch](#padrões-na-criação-de-branch)
        - [Regras gerais para merges requests](#regras-gerais-para-merges-requests)
        - [Padrões para commits](#padrões-para-commits)
        - [Boas práticas e convenções acordadas para desenvolvimento](#boas-práticas-e-conveções-acordadas-para-desenvolvimento)
  - [Arquitetura do projeto e framework de automação](#arquitetura-do-projeto-e-framework-de-automação)
  - [License](#license)
   
   

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

### Execução do Projeto

Após as instalações do NodeJs e do VScode, vamos baixar o projeto do git.

**1**. No caminho <https://dev.azure.com/uoledtech>, clicar no repositório do projeto **CasaNova_Front_Teste** para acessar nosso repositório do devops;

**2**. Clicar no botão de _Clone_ e copiar a url informada;

**3**. Na pasta de sua preferência, abrir o Prompt de Comando e executar o comando ```git clone + url copiada```;

**4**. Dentro do VScode, abrir a pasta clonada, acessar a raiz do projeto e executar no terminal o comando ```npm install```;

> Isso fará com que, na nossa estrutura de pastas, seja criado um _node_modules_ com várias dependências, incluindo o _cypress_.

**5**. A próxima etapa é executar o comando ```./node_modules/.bin/cypress open```  ou ``` npx cypress open ``` para abrir o Cypress.

**Pronto!** 

#### Extensões

Abaixo seguem alguns plugins que nos auxiliam na nossa automação. São eles:

- JavaScript (ES6) code snippets
- Commit Message Editor - **Formatador de commits**
- Markdown Preview Enhanced - **Visualizador de arquivos .md**
- Prettier - Code formatter - **Formatador de código**
- Material Icon Theme
- Cucumber (Gherkin) Full Support
- Cypress-cucumber-generator
- Snippets and Syntax Highlight for Gherkin (Cucumber)
- Bracket Pair Colorizer 2
- Add Only
- Cypress Snippets
- ES6 Mocha Snippets

## Clean Code

Nosso código deve seguir o máximo possível bons padrões de desenvolvimento, assim como qualquer script! :D 

Para entender os principais princípios a serem adotados separamos uma seção específica de [CLEAN CODE](CLEAN_CODE.md). Boa leitura!


## Entendendo o Padrão Page Object 

O padrão Page Objects é muito utilizado nos projetos de automação de testes como uma forma de organizar melhor nosso código.

Ele serve para separar responsabilidades, ou seja:

- Vamos ter um local onde ficará descrita a **ação** da página que estamos trabalhando.

- E um outro local para os **elementos** dessa página.

Resumidamente, ao usar o Page Objects, estamos construindo uma classe para cada página de testes.


**Exemplo**

Vamos usar o exemplo de uma automação de Login de uma página qualquer usando o framework Cypress.

1. É preciso criar o arquivo **Login.feature**, onde ficarão salvos nossos cenários em BDD:

```
Scenario: Login do site ABC.
  Given acesso o site ABC
  When acesso a página de login
  Then devo visualizar botão de Esqueci minha senha
```
2. Depois é necessário **mapear os elementos da página** usada no arquivo **LoginElements.js** e disponibilizá-lo para importação em outros arquivos:

```
class LoginElements {
  
  botaoLogin = () => { return 'button.submit-button' }
  botaoEsqueciSenha = () => { return '.forgot' }

  export default LoginElements;
```
3. Em seguida, é preciso criar o arquivo **LoginPage.js** para **mapear as funções e comandos que vamos executar**. Aqui também é necessário disponibilizá-lo para importação em outros arquivos:

```
import LoginElements from '../.../LoginElements'
const loginElements = new LoginElements

class LoginPage {
  // Acessa o site ABC
    acessarSite() {
      cy.visit(url)
    }

  // Clica no botão que acessa login do site ABC
    clicarBotaoLogin() {
      cy.get(loginElements.botaoLogin()).click()
    }
  
  // Verifica se o botão tem o texto "Esqueci minha senha"
    visualizarBotaoEsqueciSenha() {
        cy.get(loginElements.botaoRecuperarSenha()).should('contain', 'Esqueci minha senha')
    }
}

export default LoginPage;
```
4. Agora é preciso criar o arquivo **LoginSteps.js** Ele é necessário para **mapear os passos do nosso teste**:
```
import LoginPage from '../pageobjects/LoginPage'
const loginPage = new LoginPage

  Given("acesso o site ABC", () => {
    loginPage.acessarSite();
  })
  When("acesso a pagina de login", () => {
    loginPage.clicarBotaoPaginaLogin();
  })
  Then("devo visualizar botão de Esqueci minha senha", () => {
    loginPage.visualizarBotaoRecuperarSenha();
  }) 
```
Pronto!

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

A Squad QA da UOL Edtech usa o padrão Page Objects para o trabalho de automação dos testes.

Existem várias maneiras aceitáveis de usar este modelo de arquitetura nos projetos de automação.

Abaixo segue o modelo de estrutura que usamos em nosso projeto:

![](CasaNovaTemplateFront/cypress/readme_images/arquitetura1.PNG)

- **integration/specs**: Nessa pasta guardaremos nossas specs como features, de acordo com a metodologia BDD.  Fica definida as seguintes convenções:
  


  ![](CasaNovaTemplateFront/cypress/readme_images/specs.PNG)

    * Dentro da pasta specs constará o nome das squads associada a história sendo automatizada.
    * Dentro da pasta da squad temos qual o épico sendo trabalhado.
    * O nome das pastas devem estar sempre com letras mínusculas e/ou com uso do *underline* para separar palavras.
    * Dentro da pasta de cada épico devem existir as features associadas. Sendo que o arquivo .feature deve ser nomeado como ``` squad + funcionalidade ```
  
<p>

- **integration/step_definitions**: Nessa pasta guardaremos os métodos steps associados ao BDD. Fica definida as seguintes convenções:

  * A pasta será subdividida por steps de squads específicas e pela pasta common, que guardará steps comuns comuns.
  * Dentro da pasta de cada squad temos pastas dos épicos trabalhados
  * Dentro do épico deve ter os arquivos de steps associadas aquele épico
  *  O nome das pastas devem estar sempre com letras mínusculas e/ou com uso do *underline* para separar palavras.
  *  Dentro da pasta de cada épico devem existir as features associadas. Sendo que o arquivo .feature deve ser nomeado como ``` squad + funcionalidade ```

<p>

- **fixtures**: Arquivos de massas a serem usadas na automação, sendo estáticas ou dinâmicas. Fica definida as seguintes convenções: 
  
  -  O nome das pastas devem estar sempre com letras mínusculas e/ou com uso do *underline* para separar palavras.
  -  É dividida por squads e por fixtures de épicos.

<p>

- **Pages**: Representa abstração de páginas, com métodos e seus elementos. Fica definida  as seguintes convenções:
  <br>

  ![](CasaNovaTemplateFront/cypress/readme_images/pages.PNG)

    - As pages serão divididas em pastas por nome da squad.
    - Dentro da pasta da squad devem existir pasta dos épicos trabalhados.
    - Para cada épico temos pastas representando as páginas, que podem ser subdividias por separações visuais compartilhadas como headers, footers ou menus.
    - Na pasta associada a página devem existir 2 arquivos:
      - index.js: possui ações usadas na página associada
      - elements.js: elementos seletores associados aquela página
  <br>
    > <br>Para criação de novas páginas deve-se extender a **base_page** de forma que todas as ações gerais sejam herdadas e usadas pelas páginas filhas. Para novas ações recomenda-se a adição destas no index da página base.
  <br>





## GitFlow

O GitFlow pode ser definido resumidamente como um fluxo de trabalho através da utilização do git, que visa auxilar o desenvolvimento contínuo de software por uma equipe. O que ele faz é atribuir funções bem específicas para diferentes ramificações e definir a interações entre elas, utilizando conceitos de miniprocessos.

![exemplo](CasaNovaTemplateFront/images/../cypress/readme_images/gitflow_completo.png)

Observando a figura acima temos as seguintes definições de branches:

- *Historic branches*: o workflow utiliza dois branches principais para guardar o histórico do projeto. A **master** guarda o histórico oficial das entregras, enquanto a **develop** serve como integração entre as *branches features*.

- *Feature Branches* : Cada funcionalidade deve ter sua própria branch, que deve ser criada a partir da develop. Após a conclusão do trabalho, ela deve ser mesclada novamente com a branch pai, no caso, a develop.

- *Release Branches*: *Branch* criada a  partir da develop quando houver um conjunto de funcionalidades suficientes para entrega. Nenhuma nova funcionalidade pode ser incluída neste momento. No lançamento, ela deve ser mesclada com a master e também deve ser mesclada com a develop, que pode ter sofrido modificações posteriores.

- *Hotfix* : São usados para corrigir rapidamente algum problema em produção. É única branch a ser criada a partir da master. Após a correção, a branch é finalizada e mesclada com a master e develop.

### Processo de Desenvolvimento 

Mediante a revisão do Gitflow algumas regras/ normas foram definidas de forma adaptada para refletir o contexto da automação de testes e do time QA. Para o momento atual o ambiente de testes terá como base o ambiente de homologação entregue pelas squads. Em um momento futuro espera-se automações em ambientes de pré-produção.

#### Processo de Desenvolvimento Local


![exemplo](CasaNovaTemplateFront/images/../cypress/readme_images/gitProcess.png)

Durante o desenvolvimento das automações, a maior parte do trabalho ocorrerá de forma local, ou seja na máquina do desenvolvedor. Após a finalização da implementação, existem microprocessos definidos para subir um código para o repositório remoto, sendo eles:

1. *Working Copy*: Criação da branch de trabalho de acordo com documentação e fluxo pré-definido.
2. *Index*: Adição do trabalho realizado, finalizado e pronto para ser commitado, caracterizado pelo uso do `git add`.
3. *Local Repo*: Adição de commits e diferença de histórico da branch criada em relação ao *working copy*.
4. *Remote Repo*: Envio das alterações e do histórico criado adicionado ao repositório remoto.

#### Processo de Desenvolvimento Remoto

Após o envio das alterações da máquina local para o repositório remoto, inicia-se o processo de desenvolvimento remoto. Neste momento é que ocorre validações e avaliações da arquitetura, estrutura e cumprimento das normas pré-estabelecidas. Os micro-processos envolvidos nesta etapa podem não ocorrer de forma linear, pois em caso de falha em qualquer uma das etapas, é possível fazer regressão para correção.

* Remote Repo: validação das alterações trabalhadas pelo desenvolvedor e início do GitFlow.
* Request develop: solicitação de integração da branch de trabalho para validação de arquitetura e padrões pela equipe de trabalho.
* Merge develop : integração do código na branch *develop*.
  
* Validate develop: validação pelos integrantes envolvidos
  
* Request release: solicitação de integração do código e do trabalho realizado ao pacotes de entregas de Release, que corresponde ao pacote de automação que efetivamente irá para a esteira de testes.
* Merge release: integração do código ao pacote de entregas de Release;
* Deploy: início da execução da esteira de entregas de automação.

#### Exemplo Prático

Após finalizamos nossas alterações em um ou mais arquivos no ambiente local, quando necessário, essas alterações devem subir para a Develop. Para que isso aconteça é necessário realizar as seguintes ações:

**1**.	No Terminal do VSCode, realizar o comando `git status`. Ele serve para verificar os estados dos arquivos (alterações). Também é possível verificar a branch que estamos trabalhando.


![](CasaNovaTemplateFront\cypress\images\git-status.png)

**2**.	Após confirmar as alterações, devemos realizar o comando `git add` para adicionar todo o conteúdo do arquivo local para uma "staging area".
_Obs: O "." é separado do comando e serve para indicar o diretório corrente, mas também pode ser usado para um arquivo em específico._


![](CasaNovaTemplateFront\cypress\images\git-add.png)

**3**.	Em seguida é necessário realizar o comando `git commit -m “Mensagem”`. Ele adiciona as alterações para o histórico do repositório e atribui um nome ao commit, geralmente com as últimas alterações feitas por você no projeto.


![](CasaNovaTemplateFront\cypress\images\git-commit.png)

**4**.	A seguir é preciso realizar o comando `git push` para enviar as alterações para a sua branch dentro do repositório.


![](CasaNovaTemplateFront\cypress\images\git-push.png)

**5**.	No menu lateral do Devops, em `Repos>Pushes`, conseguimos visualizar todos os pushes realizados na sua branch, com data e horário.


![](CasaNovaTemplateFront\cypress\images\repo-push.png)

- Ao clicar em alguma das atualizações, será possível verificar as alterações realizadas naquele arquivo:

![](CasaNovaTemplateFront\cypress\images\repo-push-alteracoes.png)

**6**.	Para que as atualizações realizadas na sua branch sejam de fato enviadas para a Develop, precisamos seguir boas práticas e realizar o processo de Code Review. Para isso, no menu lateral do Devops, em `Pull request`, devemos clicar no botão de “New pull request”.

![](CasaNovaTemplateFront\cypress\images\repo-pull-request.png)

- A tela para preenchimento de informações sobre o pull request será aberta:

![](CasaNovaTemplateFront\cypress\images\repo-pull-request-1.png)

Onde:
- **A** - É a branch atual que contém as alterações;
- **B** - É a branch que deseja mesclar as alterações, por padrão, a "Master" já vem selecionada;
- **C** - Título do Pull Request;
- **D** - Descrição detalhada das alterações realizadas;
- **E** - Responsável por realizar o Code Review (obrigatório e opcional);
_OBS: Sempre é necessário colocar um revisor Obrigatório._ 
- **F** - Item do board que podemos relacionar às alterações;
- **G** - Tags que podem ser adicionadas para ajudar na nossa organização, mostrar detalhes importantes e rastreios. Elas são usadas como informações extras aos revisadores.

**7**.	Após o preenchimento das informações e de alterar a branch de “Master” para “Develop”, temos duas opções: Criar o Pull Request ou criar Rascunho do pull Request.
Caso as alterações ainda não estejam completas, podemos clicar no botão de “Creat as Draft”. Caso contrário, clicar no botão de “Create” para dar segmento na criação de Pull Request.


![](CasaNovaTemplateFront\cypress\images\repo-pull-request-2.png)

**8**.	Assim que o Pull Request é criado, automaticamente é feita uma verificação para identificar a existência de conflitos entre a branch que queremos subir e a Develop. 
- Havendo conflitos, não será permitido concluir o Pull Request. Será necessário resolver os conflitos e refazer o processo para que uma nova verificação seja realizada.
- Não havendo conflitos, o processo de code review pode proceguir.


![](CasaNovaTemplateFront\cypress\images\pull-request-conflitos.png)

**9**.	Quando criamos um Pull Request, um e-mail informativo é disparado para os usuários revisores. Para dar início ao processo de Code Review, basta clicar no botão de “View Pull Request” existente no e-mail. Isso fará com que você seja direcionado para o Pull Request em questão.

**10**.	Na tela de Pull Request, você poderá realizar o Code Review através das abas de Files, Updates, Commits e Conflicts.

![](CasaNovaTemplateFront\cypress\images\pull-request-abas.png)

- Files – Contém todas as alterações realizadas na branch de origem:

![](CasaNovaTemplateFront\cypress\images\pull-request-abas-files.png)

- Updates – Exibe as últimas atualizações da branch:

![](CasaNovaTemplateFront\cypress\images\pull-request-abas-update.png)

- Commits – Exibe o commit que está sendo enviado para alteração:

![](CasaNovaTemplateFront\cypress\images\pull-request-abas-commits.png)

- Conflicts – Caso exista algum conflito, é possível dar suporte para a solução do conflito:


![](CasaNovaTemplateFront\cypress\images\pull-request-abas-conflicts.png)

**11**.	Após realizada a revisão, caso seja necessário algum tipo de ajuste, o revisor pode adicionar um comentário que poderá ser visto pelo autor das alterações na aba de Overview.
O autor das alterações deve informar o status para a revisão em questão.

> Atualizar o status é importante para que seja possível realizar o rastreio das revisões.

![](CasaNovaTemplateFront\cypress\images\pull-request-revisao.png)

**12**.	O autor das alterações deve analisar o que foi mencionado pelo revisor, realizar os ajustes caso seja necessário e após finalizar a análise, responder o revisor com a ação que foi tomada para solucionar o mencionado problema. Também é preciso atualizar o status da revisão.

![](CasaNovaTemplateFront\cypress\images\pull-request-revisao-2.png)

**13**.	O revisor receberá as informações inseridas pelo autor e fará uma nova revisão. Estando tudo correto, o revisor pode aprovar as alterações:

![](CasaNovaTemplateFront\cypress\images\pull-request-aprovado.png)

**14**.	Após aprovação, o autor pode salvar o Pull Request como rascunho, abandonar ou completar.

![](CasaNovaTemplateFront\cypress\images\pull-request-completo.png)

- Ao clicar em "Complete", será aberta uma aba para finalização do Pull Request. Nela é possível escolher alguns tipos de merge e também escolher o que fazer após completar o merge.


![](CasaNovaTemplateFront\cypress\images\pull-request-completo-1.png)

- Com as escolhas finalizadas, podemos clicar no botão de “Complete merge”. Neste momento as alterações realizadas serão mescladas com a Develop.


![](CasaNovaTemplateFront\cypress\images\pull-request-completo-2.png)

- No menu lateral  `Repos>Branchs`, ao clicar na branch de Develop, podemos verificar as alterações mergeadas:

![](CasaNovaTemplateFront\cypress\images\pull-request-completo-ok.png)

#### Outras Normas 

O desenvolvimento das automações seguirá o fluxo pré-estabelecido para os desenvolvedores das Squads, tendo o porém de não criar uma branch de homologação, já que não será validada por outras equipes externas. Ademais, o fluxo ocorrerá de forma semelhante, de forma, que uma branch de realase será criada para cada conjunto de automações a serem entregues, estando numa sprint própria ou não. 

##### Padrões na criação de Branch


* Para automações sugere-se o seguinte padrão:

```
feature/IdItemHistoria
```

* Após o merge do pull request ser completado é obrigatória a remoção da branch
* Caso uma modificação seja necessário uma nova branch associada a feature deve sera aberta, seguindo as convenções dos commits já pré-estabelecidas.

##### Regras gerais para merges requests
* Cada Merge Request aberto, deve ficar aberto por no mínimo 30 minutos;

* Todo merge para as branches-base develop , homolog  e release-* é de responsabilidade do Desenvolvedor atrelado à ele, salvo casos extraordinários;

* Não fazer o merge em caso de comentários não resolvidos no Merge Request;

* Sempre quem abrir uma thread no Merge Request, é quem deve marcar como resolvido.

1. MERGE REQUEST para DEVELOP:
  *  Abertura do Merge Request, com a branch target develop ;
  *  É necessária aprovação de no mínimo 1 QA para a finalização do merge.

2. MERGE REQUEST para MASTER:
  * Abertura do Merge Request, com a branch target  release-* com a data específica;
  * Aprovação do coordenador da squad QA.

##### Padrões para commits
Conforme já descrito nos exemplos práticos, os commits deverão seguir um padrão para faciltar o rastreio e entendimento das alterações feitas. 

O padrão definido é baseado no [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Fica definido as seguintes regras: 

``` 
<type>[optional scope]: <description>

[optional body]

[optional footer(s) ]

```

O **tipo** informa a intenção das alterações daquele commit:

* build: Mudanças que afetam no escopo o sistema de build ou dependências externas
* config: Mudanças em quaisquer arquivos de configuração 
* docs: Somente alterações em documentação
* test: Adição de scripts de automação para testes
* fix: Correção pontual de scripts de automação por erros ou mudança de elementos.
* perf: Alterações de melhorias de performance.
* refactor: Alterações que não são fix ou test.
* style: Alterações de formatação de código


A **descrição** deve conter a ideia central das alterações do commit. Maiores explicações ou motivações devem ser escritos no **corpo** do commit.


####Por que Cypress?

O Cypress é um ótimo framework para automação de testes que tem uma curva de aprendizado muito rápida e atende aos diversos tipos de testes realizados pela equipe.

Vantagens na utilização desta ferramenta:

* Sua **instalação** é super simples e vem com vários exemplos de executáveis para auxiliar na criação dos nossos testes;
* Possui uma **Comunidade** super ampla e colaborativa;
* Suporta divesos tipos de testes como Funcionais, API, Componentes e Unidade;
* Permite **integração** com várias ferrametas e plugins, como por exemplo o Cucumber e Git;
* Possui **Espera Automatica**, ou seja, ele aguarda os elementos estarem disponíveis na tela para poder interagir e ainda permite customizar este comportamento;
* **Documentação** de alto nível com explicações detalhadas sobre o seu funcionamento.
Link para documentação: <https://docs.cypress.io/guides/overview/why-cypress>



