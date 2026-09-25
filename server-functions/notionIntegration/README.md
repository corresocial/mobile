# notionIntegration

<aside>
💡 Função responsável por registrar mensagens do "Fale Conosco", denúncias e erros do app no banco de dados do Notion, sem expor a chave da integração no aplicativo.

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-e0a9eda5f9e74be3980cd5be10aa8b39?pvs=21)

### Configuração de console Google Cloud Platform

.env.yaml com as credenciais do Notion (gerado pelo `config_all.sh` a partir do `.env` da raiz):

```yaml
NOTION_FALECONOSCO_KEY: "token_da_integracao_interna_do_notion"
NOTION_FALECONOSCO_ID: "id_do_banco_de_dados_fale_conosco"
```

- **NOTION_FALECONOSCO_KEY**: token da integração interna do Notion ([integrações](https://www.notion.so/profile/integrations)).
- **NOTION_FALECONOSCO_ID**: ID do banco de dados do Fale Conosco. O banco precisa estar compartilhado com a integração.

> **Nota**: O arquivo `.env.yaml` é ignorado pelo git para segurança. Não comite este arquivo.

## Request

```tsx
export type RequestBody = {
    type: 'erro' | 'denúncia' | 'melhoria' | 'outro'
    message: string
    title?: string
    reportedTarget?: 'none' | 'income' | 'culture' | 'socialImpact' | 'user' | 'poll' | 'petition'
    reportedId?: string
}
```

- **type**: Categoria da mensagem.
- **message**: Conteúdo da mensagem (truncado em 2000 caracteres, limite do Notion).
- **title**: Título do registro. Se omitido, usa as primeiras 15 palavras da mensagem.
- **reportedTarget / reportedId**: Entidade denunciada, quando houver.

O `senderId` gravado no Notion vem do token de autenticação (`request.auth.uid`), nunca do corpo da requisição. Requisições anônimas (apenas `type: 'erro'`) são gravadas como `anonymous`.

## Response

```tsx
export type ResponseBody = {
    id: string // ID da página criada no Notion
    object: 'page'
    reportId: string // Protocolo gerado para o registro
}
```

## Fluxo de informações

1. Recebe a requisição com tipo, mensagem e dados da denúncia.
2. Verifica autenticação (exceto para tipo 'erro').
3. Valida o tipo e a mensagem; alvos de denúncia desconhecidos viram `none`.
4. Gera o protocolo (`reportId`) e cria a página no banco do Notion via axios.
5. Retorna apenas `id`, `object` e `reportId` para o app.

## Deploy

<aside>
💡 É necessário ter o `gcloud sdk` instalado na máquina

</aside>

<aside>
💡 Estar dentro do diretório raiz da cloud function que deseja realizar o deploy

</aside>

É necessário converter o código para JavaScript antes de fazer o deploy, executando diretamente da pasta da função

```jsx
npm run deploy
```

OU

```jsx
npm run build
```

```jsx
cd deploy
```

```jsx
gcloud functions deploy notionIntegration \
  --gen2 \
  --runtime nodejs22 \
  --trigger-http \
  --entry-point notionIntegration \
  --region southamerica-east1 \
  --allow-unauthenticated \
  --env-vars-file ../.env.yaml
```
