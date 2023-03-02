# Detalhes do código

## Diretórios main

[.github/workflow/](https://github.com/corre-social/mobile/tree/dev/.github/workflows) : Contém os arquivos de configuração relacionados ao CI/CD e o GitHub Actions.

[app/](https://github.com/corre-social/mobile/tree/dev/app) : Raiz da aplicação.

[app/assets/](https://github.com/corre-social/mobile/tree/dev/app/assets) : Contém os assets utilizados para configuração de splash e ícones.

[app/functions/](https://github.com/corre-social/mobile/tree/dev/app/functions) : Contém as cloud functions que foram hospedadas na Cloud Firestore.

[app/plugins/](https://github.com/corre-social/mobile/tree/dev/app/plugins) : Plugins utilizados para auxiliar no processo de geração de builds.

[app/src/](https://github.com/corre-social/mobile/tree/dev/app/src) : Contém todas as funções, estilos, componentes, regras de negócio, rotas e tipagems da aplicação.


## app/src
[app/src/assets/](https://github.com/corre-social/mobile/tree/dev/app/assets) : Ícones, animações e imagens utilizadas no projeto.

[app/src/common/](https://github.com/corre-social/mobile/tree/dev/app/src/common) : Funções auxilares e parâmetros globais(temas e dimensões do dispositivo) [deprecated].

[app/src/utils/](https://github.com/corre-social/mobile/tree/dev/app/src/utils) :  Funções e parâmetros globais(arquivo de categorias, lançamento de erro e funções auxiliares, etc).

[app/src/contexts/](https://github.com/corre-social/mobile/tree/dev/app/src/contexts) : Contextos da aplicação.

[app/src/routes/](https://github.com/corre-social/mobile/tree/dev/app/src/routes) : Contém todas as rotas utilizadas(stack, tabs).

[app/src/services/](https://github.com/corre-social/mobile/tree/dev/app/src/services) : Contém funções e configurações de serviços externos como: firestore, notion, discord, algolia, cloud functions e google maps.

[app/src/screens/](https://github.com/corre-social/mobile/tree/dev/app/src/screens) : Telas do aplicativo, separadas por seus respectivos fluxos.


## app/src/screens 
* [authRegisterScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/authRegisterScreens) : Telas presentes na autenticação e registro.
* [profileScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/profileScreens) : Telas relacionadas ao perfil e edição de próprio.
* [homeScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/homeScreens) : Telas do feed e do fluxo de catálogo.
* [configurationScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/configurationScreens) : Telas de configuração acessadas pelo perfil.
* [viewPostScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/viewPostScreens) : Telas de vizualização dos variados tipos de posts.
* [editPostScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/editPostScreens) : Telas de edição dos posts.
* [serviceRegisterScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/serviceRegisterScreens) : Telas de cadastro de serviços.
* [saleRegisterScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/saleRegisterScreens) : Telas de cadastro de vendas.
* [vacancyRegisterScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/vacancyRegisterScreens) : Telas de cadastro de vagas.
* [socialImpactRegisterScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/socialImpactRegisterScreens) : Telas de cadastro de impacto social.
* [cultureRegisterScreens](https://github.com/corre-social/mobile/tree/dev/app/src/screens/cultureRegisterScreens) : Telas de cadastro de cultura.
     

## Biblioteca de componentes (in progress)
[app/src/components/](https://github.com/corre-social/mobile/tree/dev/app/src/components) : Componentes utilizados no projeto.

<details>
<summary>DefaultHeaderContainer</summary>
https://github.com/corre-social/mobile/tree/dev/app/src/components/_containers/DefaultHeaderContainer

![image](https://user-images.githubusercontent.com/64331839/222468097-b14ec944-03fa-47f5-b98f-8878e8dcdac3.png)
---
</details>


## Arquivos de configuração da raiz(app/)

[app/App.tsx](https://github.com/corre-social/mobile/blob/dev/app/App.tsx) : Arquivo raiz da aplicação, o qual é o módulo de entrata importado pelo arquivo /node_modules/expo/AppEntry.js.

[app/env.sample](https://github.com/corre-social/mobile/blob/dev/app/env.sample) : Variáveis de ambiente que devem estar configuradas para que o app funcione corretamente.

[app/babel.config.js](https://github.com/corre-social/mobile/blob/dev/app/babel.config.js) : Arquivo de configuração do babel, utilizado para lidar com dependências como o reanimated e o dotenv.

[app/app.json](https://github.com/corre-social/mobile/blob/dev/app/app.json) : Arquivo de configuração do aplicativo para o ambiente de testes, preview e produção.

[app/eas.json](https://github.com/corre-social/mobile/blob/dev/app/eas.json) : Arquivo de configuração do eas-cli, utilizado no processo de geração de builds

[app/firebase.json](https://github.com/corre-social/mobile/blob/dev/app/firebase.json) & [app/firebasrc](https://github.com/corre-social/mobile/blob/dev/app/.firebaserc) : Arquivos utilizados para a realização de deploy das cloud functions.

[app/ignoredLogs.ts](https://github.com/corre-social/mobile/blob/dev/app/ignoredLogs.ts) : Array de logs à serem ignorados e não apresentados pelo console.

[app/package.json](https://github.com/corre-social/mobile/blob/dev/app/package.json) : Contém todas as dependências e commandos utilizados no processo de desenvolvimento, bem como o nome e a versão da aplicação.

[app/settings.gradle](https://github.com/corre-social/mobile/blob/dev/app/settings.gradle) : Arquivo de config utilizado no processo de CI/CD pelo GitHub Actions.

[app/tsconfig.json](https://github.com/corre-social/mobile/blob/dev/app/tsconfig.json) : Configuração do typescript.

[app/yarn.lock](https://github.com/corre-social/mobile/blob/dev/app/yarn.lock) & [app/package-lock.json](https://github.com/corre-social/mobile/blob/dev/app/package-lock.json) : Lista e mantém todas as dependências específicas utilizadas no projeto.

[app/metro.config.js](https://github.com/corre-social/mobile/blob/dev/app/metro.config.js) : Contém configuração do ambiente de desenvolvimento, configuração de roteamento, configurações de otimização, configuração de assets, extenções, etc. 

[app/.gitignore](https://github.com/corre-social/mobile/blob/dev/app/.gitignore) : Contém os arquivos e extenções ignorados pelo git.

[app/editorconfig](https://github.com/corre-social/mobile/blob/dev/app/.editorconfig) : Arquivo que contém algumas preferências de formatação de identação do VSCode.

[app/.eslintrc.json](https://github.com/corre-social/mobile/blob/dev/app/.eslintrc.json) : Contém a configuração do ESLint, sendo extendido do airbnb e sobreecrito com regras personalizadas.

[app/.eslintignore](https://github.com/corre-social/mobile/blob/dev/app/.eslintignore) : Contém os arquivos ignorados pelo ESLint.
