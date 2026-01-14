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

## Configuração de Variáveis de Ambiente

Antes de fazer o deploy, você **deve** configurar as variáveis de ambiente necessárias:

1. Copie o arquivo de exemplo para criar seu arquivo `.env`:

```bash
cp .env.sample .env
```

2. Edite o arquivo `.env` e preencha com suas credenciais reais:
   - **Discord Webhooks**: URLs dos webhooks do seu servidor Discord
   - **Algolia**: ID e chave de API da sua conta Algolia
   - **Stripe**: Chave secreta e webhook secret do Stripe

> ⚠️ **IMPORTANTE**: O arquivo `.env` contém credenciais sensíveis e **não deve ser commitado** no repositório. Certifique-se de que está no `.gitignore`.

## Scripts Disponíveis

O projeto contém três scripts auxiliares na raiz:

| Script | Comando | Descrição |
| --- | --- | --- |
| `config_all.sh` | `bash config_all.sh` | Gera arquivos `.env.yaml` para cada função baseado no `.env` principal |
| `install_all_deps.sh` | `npm run install:all` | Instala dependências de todas as funções |
| `deploy_all.sh` | `bash deploy_all.sh` | Executa config, instalação e deploy de todas as funções |

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

### Configuração do Google Cloud

Certifique-se de ter se autenticado no Google Cloud e selecionado o projeto correto antes de fazer o deploy:

```bash
gcloud auth login
gcloud config set project [SEU_ID_DO_PROJETO]
```

### Deploy de Todas as Funções (Recomendado)

O script `deploy_all.sh` executa automaticamente todos os passos necessários:

1. **Gera arquivos `.env.yaml`**: Cria arquivos de configuração para cada função baseado no `.env` principal
2. **Instala dependências**: Executa `npm install` em todas as funções
3. **Faz o deploy**: Implanta todas as funções no GCP

```bash
bash deploy_all.sh
```

> 💡 **Dica**: Este é o método mais seguro, pois garante que tudo está configurado corretamente antes do deploy.

### Deploy de Funções Individuais

Você pode fazer o deploy de uma função específica executando o script de deploy definido em seu `package.json`.

**Exemplo:**

```bash
cd checkUserPhoneAlreadyRegistred
npm run deploy
```

> **Nota:** Ao fazer deploy individual, certifique-se de que:
> - O arquivo `.env.yaml` foi gerado (execute `bash config_all.sh` na raiz)
> - As dependências estão instaladas (`npm install`)

### Como Funciona a Configuração Automática

O script `config_all.sh` lê o arquivo `.env` principal e gera automaticamente arquivos `.env.yaml` específicos para cada função, incluindo apenas as variáveis relevantes:

- **discordIntegration**: Recebe webhooks do Discord
- **searchPostsByAlgolia**: Recebe credenciais do Algolia
- **stripeApi**: Recebe chaves do Stripe

Isso garante que cada função tenha acesso apenas às variáveis que realmente precisa.

## Referências

- [React Native Firebase - Cloud Functions Usage](https://rnfirebase.io/functions/usage)
