# discordIntegration

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por integrar com o Discord para envio de mensagens, erros e denúncias.

</aside>

## Configuração

Service account: `fn-discord` (sem papéis no projeto).

As URLs dos webhooks ficam no Secret Manager e chegam à função como variáveis de ambiente via `--set-secrets` (veja o `package.json`):

- `FALECONOSCO_WEBHOOK`
- `ERROS_WEBHOOK`
- `DENUNCIAR_WEBHOOK`

Para criar/rotacionar os segredos, use o `setup_secrets.sh` da raiz (veja o [README principal](../README.md)).

## Request

```ts
export type RequestBody = {
    content: string // obrigatório, até 1800 caracteres
    type?: 'erro' | 'denúncia' | 'melhoria' | 'outro' | 'fale-conosco' // padrão: 'fale-conosco'
}
```

- **content**: Conteúdo da mensagem a ser enviada. Menções (`@everyone`, `@here`, cargos e usuários) não notificam ninguém.
- **type**: Tipo de mensagem, que define o webhook de destino:
    - `erro` → `ERROS_WEBHOOK` (aceita chamada anônima, porque o app reporta erros antes do login)
    - `denúncia` → `DENUNCIAR_WEBHOOK`
    - `melhoria`, `outro`, `fale-conosco` ou ausente → `FALECONOSCO_WEBHOOK`
    - Qualquer outro valor → erro `invalid-argument`

## Response

```ts
{ ok: true }
```

A resposta do Discord não é repassada ao cliente.

## Fluxo de informações

1. Recebe a requisição com conteúdo e tipo.
2. Valida o tipo (allowlist) e o conteúdo.
3. Verifica autenticação (exceto para tipo `erro`).
4. Encaminha a mensagem para o webhook do tipo, com `allowed_mentions: { parse: [] }`.
5. Em caso de erro, loga só o nome do webhook, o status HTTP e o código do erro (nunca a URL, que contém o token).

## Riscos

Sem App Check nem rate limit: o tipo `erro` pode ser usado anonimamente para enviar spam ao canal de erros. Veja "Riscos Residuais" no [README principal](../README.md).

## Deploy

<aside>
💡 É necessário ter o `gcloud sdk` instalado na máquina

</aside>

Dentro da pasta da função:

```bash
npm run deploy
```

O comando compila o TypeScript (`npm run build`, saída em `deploy/`) e executa o `deploy-cloud-function` do `package.json` (runtime `nodejs22`, service account `fn-discord` e `--set-secrets`). Não faça o deploy manualmente com outras flags: sem `--service-account` a função passa a rodar com a service account padrão.
