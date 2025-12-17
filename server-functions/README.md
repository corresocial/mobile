# Funções do Servidor

Este repositório contém as Cloud Functions (Funções em Nuvem) do lado do servidor para o aplicativo móvel Corre. Estas funções são implantadas no Google Cloud Platform (GCP) e lidam com várias tarefas de backend, como notificações, verificação de usuários, recuperação de feed e busca.

## Estrutura do Projeto

O projeto é organizado por função, onde cada diretório representa uma Cloud Function separada com suas próprias dependências e configurações.

- **Raiz**: Contém scripts utilitários para instalação e deploy em massa.
- **Diretórios das Funções**: Cada função ativa tem sua própria pasta contendo o código-fonte (`index.ts`), configuração (`package.json`) e scripts de deploy.
- **_deprecated/**: Contém funções antigas que não estão mais em uso ativo ou foram substituídas.

## Funções Disponíveis

| Nome da Função | Descrição | Gatilho (Trigger) |
| --- | --- | --- |
| **chatMessagesNotificationListener** | Monitora novas mensagens no Realtime Database e envia notificações push via Expo. | Realtime Database (Create) |
| **checkUserPhoneAlreadyRegistred** | Verifica se o número de telefone de um usuário já está registrado no Firebase Authentication. | Requisição HTTP |
| **getFeedPosts** | Recupera postagens para o feed do usuário. | Requisição HTTP |
| **searchPostsByAlgolia** | Realiza operações de busca de postagens usando a integração com Algolia. | Requisição HTTP |

## Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão 20 recomendada)
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)

## Instalação

Para instalar as dependências de todas as funções de uma vez, execute:

```bash
npm run install:all
```

Ou você pode instalar as dependências de uma função específica navegando até seu diretório e executando:

```bash
npm install
```

## Deploy

### Deploy de Todas as Funções

Para fazer o deploy de todas as funções ativas:

```bash
./deploy_all.sh
```

### Deploy de Funções Individuais

Você pode fazer o deploy de uma função específica executando o script de deploy definido em seu `package.json`.

**Exemplo:**

```bash
cd checkUserPhoneAlreadyRegistred
npm run deploy
```

> **Nota:** Algumas funções, como `chatMessagesNotificationListener`, podem exigir configuração manual ou passos de build específicos definidos em seus respectivos arquivos README. Por favor, verifique a documentação específica dentro da pasta de cada função, se disponível.

### Configuração

Certifique-se de ter se autenticado no Google Cloud e selecionado o projeto correto antes de fazer o deploy:

```bash
gcloud auth login
gcloud config set project [SEU_ID_DO_PROJETO]
```

Algumas funções podem exigir variáveis de ambiente.

#### Configuração Específica: searchPostsByAlgolia

Para a função **searchPostsByAlgolia**, é **obrigatório** configurar um arquivo `.env.yaml` dentro do diretório da função antes de realizar o deploy.

Crie um arquivo chamado `.env.yaml` em `searchPostsByAlgolia/.env.yaml` com o seguinte conteúdo:

```yaml
ALGOLIA_ID: "SEU_ALGOLIA_ID"
ALGOLIA_KEY: "SUA_ALGOLIA_KEY"
```

O script de deploy desta função já está configurado para ler este arquivo automaticamente via flag `--env-vars-file`.

## Referências

- [React Native Firebase - Cloud Functions Usage](https://rnfirebase.io/functions/usage)
