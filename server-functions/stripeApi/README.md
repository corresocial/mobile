# stripeApi

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por gerenciar operações relacionadas ao Stripe, como criação de clientes, assinaturas e pagamentos.

</aside>

## Configuração

### Configuração de console Google Cloud Platform

É necessário configurar as variáveis de ambiente para o funcionamento correto da integração com o Stripe.

Crie um arquivo `.env.yaml` na raiz da função (`server-functions/stripeApi/.env.yaml`) com as seguintes chaves:

```yaml
STRIPE_SECRET_KEY: "sua_chave_secreta_do_stripe"
```

> **Nota**: O arquivo `.env.yaml` é ignorado pelo git para segurança. Não comite este arquivo.

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

Para fazer o deploy, execute o comando abaixo. Ele irá compilar o código TypeScript e realizar o deploy utilizando as variáveis de ambiente definidas no arquivo `.env.yaml`.

```bash
npm run deploy
```

O comando `npm run deploy` executa internamente:

1. `npm run build`: Compila o TypeScript.
2. `gcloud functions deploy ... --env-vars-file ../.env.yaml`: Faz o deploy enviando as variáveis de ambiente.
