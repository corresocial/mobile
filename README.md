# Corre Mobile

Este repositório contém o código fonte da aplicação móvel Corre e suas funções de servidor associadas.

## Estrutura do Repositório

O projeto está organizado em dois diretórios principais que servem o aplicativo:

- **`app/`**: Contém o código fonte da aplicação móvel desenvolvida com React Native e Expo. Aqui reside toda a interface do usuário e lógica do cliente.
- **`server-functions/`**: Contém as funções de servidor (Cloud Functions), responsáveis pela lógica de backend, integrações e processamento de dados que dão suporte ao aplicativo.

## Documentação do Ambiente

Para configurar seu ambiente de desenvolvimento e acessar documentações detalhadas sobre o projeto, consulte nossa página de referência:

🔗 **[Documentação Open Source - Notion](https://corre.notion.site/Open-Source-2cc8fff6730e807da999e15a6f28caca)**

### Itens da Documentação

Na página de documentação, você encontrará os seguintes recursos essenciais:

*   **Documentação do código**: Detalhes técnicos sobre a arquitetura, componentes e lógica interna do aplicativo.
*   **Ambientes de desenvolvimento**: Instruções para configurar os diferentes ambientes (desenvolvimento, produção) e suas respectivas variáveis.
*   **Manual de colaboração GitHub**: Guia de boas práticas para commits, pull requests e fluxo de trabalho no repositório.
*   **Publicação nas Lojas**: Processo e requisitos para publicar novas versões do aplicativo na Google Play Store e Apple App Store.
*   **Design System & Brandbook**: Diretrizes visuais, paleta de cores, tipografia e componentes de UI utilizados no projeto.
*   **Assets**: Recursos gráficos como logotipos, ícones e imagens utilizados no aplicativo.
*   **Banco de Dados**: Modelagem de dados, esquemas e informações sobre a estrutura do banco de dados utilizado.

## Como Executar

Cada parte do projeto possui seu próprio guia de execução detalhado:

### Aplicação Móvel (`app/`)
Consulte o arquivo [`app/README.md`](app/README.md) para instruções sobre:
- Instalação de dependências.
- Configuração de variáveis de ambiente (`.env`).
- Comandos para rodar em emuladores (Android/iOS) ou dispositivos físicos.
- Scripts de build e deploy.

### Funções do Servidor (`server-functions/`)
Consulte o arquivo [`server-functions/README.md`](server-functions/README.md) para instruções sobre:
- Instalação de dependências das funções.
- Configuração do Google Cloud SDK.
- Scripts para deploy de funções individuais ou em massa.
- Configuração de variáveis de ambiente específicas (ex: Algolia).
