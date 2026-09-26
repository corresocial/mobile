# Funções do Servidor

Este repositório contém as Cloud Functions (Funções em Nuvem) do lado do servidor para o aplicativo móvel Corre. Estas funções são implantadas no Google Cloud Platform (GCP) e lidam com várias tarefas de backend, como notificações, verificação de usuários, recuperação de feed e busca.

## Estrutura do Projeto

O projeto é organizado por função, onde cada diretório representa uma Cloud Function separada com suas próprias dependências e configurações.

- **Raiz**: Contém scripts utilitários para segredos, instalação e deploy em massa.
- **Diretórios das Funções**: Cada função ativa tem sua própria pasta contendo o código-fonte (`index.ts`), configuração (`package.json`) e scripts de deploy.
- **_deprecated/**: Contém funções antigas que não estão mais em uso ativo ou foram substituídas.

## Funções Disponíveis

| Nome da Função | Descrição | Gatilho (Trigger) |
| --- | --- | --- |
| **chatMessagesNotificationListener** | Monitora novas mensagens no Realtime Database e envia notificações push via Expo. | Realtime Database (Create) |
| **checkUserPhoneAlreadyRegistred** | Verifica se o número de telefone de um usuário já está registrado no Firebase Authentication. | Callable (HTTP) |
| **discordIntegration** | Encaminha mensagens de fale conosco, erros e denúncias para webhooks do Discord. | Callable (HTTP) |
| **getFeedPosts** | Recupera postagens para o feed do usuário. | Callable (HTTP) |
| **searchPostsByAlgolia** | Realiza operações de busca de postagens usando a integração com Algolia. | Callable (HTTP) |
| **stripeApi** | Operações com o Stripe (clientes, assinaturas, pagamentos). | Callable (HTTP) |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22 (as funções rodam no runtime `nodejs22`, 2ª geração)
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) autenticado (`gcloud auth login`)
- API do Secret Manager ativada no projeto (uma vez só):

```bash
gcloud services enable secretmanager.googleapis.com --project=corresocialapp
```

- Quem faz o deploy precisa de `roles/iam.serviceAccountUser` nas service accounts das funções (para usar `--service-account`) e de permissão para administrar segredos (`roles/secretmanager.admin`) para rodar o `setup_secrets.sh`.

O projeto padrão é `corresocialapp`. Para usar outro, defina `GCP_PROJECT` (vale para os scripts e para o `npm run deploy` de cada função):

```bash
export GCP_PROJECT=outro-projeto
```

## Segurança: uma service account por função

Cada função roda com a sua própria service account (`--service-account` no script `deploy-cloud-function` do `package.json`), com o mínimo de permissões. Nenhuma função usa a service account padrão do Compute Engine.

Os segredos ficam no **Secret Manager** e chegam às funções como variáveis de ambiente via `--set-secrets`. O acesso (`roles/secretmanager.secretAccessor`) é concedido **em cada segredo**, só para a service account da função que o usa, e nunca no nível do projeto.

| Função | Service account | Papéis | Segredos |
| --- | --- | --- | --- |
| checkUserPhoneAlreadyRegistred | `fn-check-phone@corresocialapp.iam.gserviceaccount.com` | `roles/firebaseauth.viewer` (projeto) | — |
| getFeedPosts | `fn-feed@corresocialapp.iam.gserviceaccount.com` | `roles/datastore.viewer` (projeto) | — |
| searchPostsByAlgolia | `fn-search@corresocialapp.iam.gserviceaccount.com` | nenhum no projeto; `secretAccessor` nos seus segredos | `ALGOLIA_ID`, `ALGOLIA_KEY` |
| stripeApi | `fn-stripe@corresocialapp.iam.gserviceaccount.com` | `roles/datastore.user` (projeto); `secretAccessor` no seu segredo | `STRIPE_SECRET_KEY` |
| discordIntegration | `fn-discord@corresocialapp.iam.gserviceaccount.com` | nenhum no projeto; `secretAccessor` nos seus segredos | `FALECONOSCO_WEBHOOK`, `ERROS_WEBHOOK`, `DENUNCIAR_WEBHOOK` |

> `chatMessagesNotificationListener` ainda é implantada manualmente pelo console e está fora deste fluxo.

## Scripts Disponíveis

| Script | Comando | Descrição |
| --- | --- | --- |
| `setup_secrets.sh` | `bash setup_secrets.sh [--dry-run]` | Lê o `.env`, cria/atualiza os segredos no Secret Manager e concede acesso só à service account de cada função |
| `install_all_deps.sh` | `npm run install:all` | Instala dependências de todas as funções |
| `deploy_all.sh` | `bash deploy_all.sh` | Instala dependências e faz o deploy de todas as funções |
| `config_all.sh` | — | **Descontinuado.** Só imprime o aviso do novo fluxo e sai com erro |

## Deploy

### Fluxo

1. **Rotacione as chaves** no provedor (Discord, Algolia, Stripe). As chaves antigas vazaram e devem ser revogadas.
   - Discord: apague e recrie os webhooks (ou gere um novo token).
   - Algolia: crie uma chave **só de busca** (ACL `search`) e revogue a antiga. Não use a Admin API Key.
   - Stripe: role a chave secreta; prefira uma *restricted key* (`rk_live_...`) só com as permissões usadas pela `stripeApi`.
2. **Preencha o `.env`** com as chaves novas. Ele serve só de entrada para o `setup_secrets.sh`; as funções não leem `.env` nem `.env.yaml`.

```bash
cp .env.sample .env
```

3. **Envie os segredos** para o Secret Manager (confira antes com `--dry-run`, que mostra os comandos sem os valores):

```bash
bash setup_secrets.sh --dry-run
bash setup_secrets.sh
```

4. **Faça o deploy**, de todas as funções ou de uma só:

```bash
bash deploy_all.sh
```

```bash
cd searchPostsByAlgolia
npm run deploy
```

5. **Depois de validar**, desative as versões antigas dos segredos e apague o `.env` local (os valores já estão no Secret Manager):

```bash
gcloud secrets versions list NOME_DO_SEGREDO --project=corresocialapp
gcloud secrets versions disable VERSAO --secret=NOME_DO_SEGREDO --project=corresocialapp
```

> Os deploys usam `NOME:latest`, que é lido quando a instância sobe. Depois de uma nova rotação, faça o deploy de novo para que todas as instâncias passem a usar a versão nova.

### Primeiro deploy após a migração

O `gcloud functions deploy` **mantém** as variáveis de ambiente de deploys anteriores quando nenhuma flag de variável é passada. Por isso, as variáveis antigas em texto puro (`ALGOLIA_*`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `*_WEBHOOK`) continuam na configuração de `searchPostsByAlgolia`, `stripeApi` e `discordIntegration`. Se uma delas tiver o mesmo nome de um segredo, o deploy pode falhar por conflito.

Nesse primeiro deploy, limpe as variáveis comuns (nenhuma função usa variável de ambiente comum):

```bash
cd discordIntegration   # repita em searchPostsByAlgolia e stripeApi
npm run build && npm run deploy-cloud-function -- --clear-env-vars
```

Depois disso, confira no console (Cloud Run functions > função > Variáveis e secrets) que só aparecem as referências aos segredos.

### Arquivos que não devem ir para o git

O `.gitignore` já cobre `.env`, `.env.yaml` e `cred.json`. Arquivos `*/.env.yaml` do fluxo antigo podem ser apagados: não são mais usados (o `setup_secrets.sh` avisa se encontrar algum).

## Riscos Residuais

- **discordIntegration: abuso sem App Check nem rate limit.** O tipo `erro` aceita chamadas **anônimas**, porque o app reporta erros antes do login. Qualquer pessoa com a URL da função pode enviar mensagens para o canal de erros, e usuários logados podem enviar para fale conosco e denúncias. Já mitigado: tipos em allowlist, `content` limitado a 1800 caracteres, menções bloqueadas (`allowed_mentions`), sem devolver a resposta do Discord e sem logar a URL do webhook. O "ID do remetente" dentro do texto é informado pelo cliente e não é verificado. Próximos passos: App Check e rate limit (por IP/uid).
- **checkUserPhoneAlreadyRegistred: consulta de existência de telefone (LGPD).** A função responde, sem autenticação, se um número tem conta no Corre. Ela é chamada **antes do login**, então não dá para exigir autenticação. Telefone é dado pessoal, e a confirmação de que ele tem conta permite enumerar usuários. Já mitigado: validação E.164 e nenhum log de telefone ou uid. Opções:
  1. **App Check**: configurar App Check no app (Play Integrity / App Attest) e mudar `ENFORCE_APP_CHECK` para `true` em `checkUserPhoneAlreadyRegistred/index.ts` (com `firebase-functions` >= 4, usar `onCall({ enforceAppCheck: true }, ...)`). Reduz o abuso por scripts, mas não elimina a consulta.
  2. **Reestruturar o fluxo** (elimina o oráculo): fazer o login por telefone direto no Firebase Auth (`signInWithPhoneNumber`) e decidir "cadastro novo x login" depois da verificação do SMS (`additionalUserInfo.isNewUser` ou existência do documento do usuário). Aí esta função pode ser removida. Exige mudança no app.
- **Localização "aproximada" nas respostas.** Em `getFeedPosts` e `searchPostsByAlgolia`, posts com `locationView: 'approximate'` só têm as coordenadas deslocadas aleatoriamente a cada requisição. Rua, número, CEP, bairro e geohash (quando gravados no documento) continuam na resposta, e a média de várias requisições se aproxima do ponto real. Corrigir exige definir com o app quais campos exibir.
- **Sem rate limit** em `getFeedPosts` e `searchPostsByAlgolia`: um usuário autenticado pode raspar os posts.
- **Dependências antigas**: `firebase-functions` 3.x e `firebase-admin` 10.x. O 3.x não tem `enforceAppCheck` no `onCall` (v2).
- **Versões `:latest`**: são resolvidas na subida da instância. Fixar a versão no `--set-secrets` deixa o deploy reprodutível, mas exige atualizar o `package.json` a cada rotação.

## Referências

- [React Native Firebase - Cloud Functions Usage](https://rnfirebase.io/functions/usage)
- [Secret Manager com Cloud Run functions](https://cloud.google.com/functions/docs/configuring/secrets)
