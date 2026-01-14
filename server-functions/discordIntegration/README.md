# discordIntegration

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por integrar com o Discord para envio de mensagens, erros e denúncias.

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-e0a9eda5f9e74be3980cd5be10aa8b39?pvs=21)

### Configuração de console Google Cloud Platform

.env.yaml com as keys de webhook:
FALECONOSCO_WEBHOOK=
ERROS_WEBHOOK=
DENUNCIAR_WEBHOOK=

## Request

```jsx
export type RequestBody = {
    content: string
    type: 'erro' | 'denúncia' | 'fale-conosco' // ou outro tipo padrão
}
```

- **content**: Conteúdo da mensagem a ser enviada.
- **type**: Tipo de mensagem para determinar o webhook de destino.

## Fluxo de informações

1. Recebe a requisição com conteúdo e tipo.
2. Verifica autenticação (exceto para tipo 'erro').
3. Seleciona o webhook apropriado baseado no tipo.
4. Encaminha a mensagem para o Discord via axios.

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
gcloud functions deploy discordIntegration \
  --gen2 \
  --runtime nodejs20 \
  --trigger-http \
  --entry-point discordIntegration \
  --region southamerica-east1 \
  --allow-unauthenticated \
  --env-vars-file ../.env.yaml
```
