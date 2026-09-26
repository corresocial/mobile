# stripeApi

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por gerenciar operações relacionadas ao Stripe, como criação de clientes, assinaturas e pagamentos.

</aside>

## Configuração

Service account: `fn-stripe` (`roles/datastore.user`).

A `STRIPE_SECRET_KEY` fica no Secret Manager e chega à função como variável de ambiente via `--set-secrets` (veja o `package.json`). Para criar/rotacionar o segredo, use o `setup_secrets.sh` da raiz (veja o [README principal](../README.md)). Prefira uma *restricted key* (`rk_live_...`).

> O `.env.yaml` não é mais usado. `STRIPE_WEBHOOK_SECRET` também não: o `stripeWebhook` não está implantado.

## Request

A função espera um objeto de dados contendo a `action` a ser executada e os parâmetros necessários para essa ação.

```typescript
type RequestData = {
    action: 'create-customer' | 'update-customer' | 'payment-methods' | 'attach-payment-method' | 'set-default-payment-method' | 'subscriptions' | 'create-subscription' | 'update-subscription' | 'cancel-subscription' | 'refund-last-payment' | 'send-receipt' | 'products';
    [key: string]: any; // Outros parâmetros dependendo da ação
}
```

## Deploy

<aside>
💡 É necessário ter o `gcloud sdk` instalado na máquina

</aside>

<aside>
💡 Estar dentro do diretório raiz da cloud function que deseja realizar o deploy

</aside>

Para fazer o deploy, execute o comando abaixo. Ele irá compilar o código TypeScript e realizar o deploy lendo a chave do Secret Manager.

```bash
npm run deploy
```

O comando `npm run deploy` executa internamente:

1. `npm run build`: Compila o TypeScript.
2. `gcloud functions deploy ... --service-account fn-stripe@... --set-secrets STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest`: Faz o deploy (runtime `nodejs22`) com a service account da função e a chave do Secret Manager.
