# checkUserPhoneAlreadyRegistred

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por obter as postagens por localização, retornando um objeto contendo separadamente as postagens de acordo com o alcance (nearby, city, country)

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-a70ccd10fec84c5d8a9a70f3e0e9e2c2?pvs=21)

### Configuração de console Google Cloud Platform

FIREBASE_CONFIG

```jsx
{
	"projectId":"",
	"storageBucket":"",
	"locationId":""
}
```

GCLOUD_PROJECT

```jsx
GOOGLE_CLOUD_PROJECT_NAME
```

EVENTARC_CLOUD_EVENT_SOURCE

```jsx
projects/GOOGLE_CLOUD_PROJECT_NAME/locations/LOCALE/functions/checkUserPhoneAlreadyRegistred
```

## Request

```jsx
{
	phoneNumber: string // formato +55(DDD)(Telefone) = +5569992846588
}
```

- **phoneNumber**: Número de telefone à ser verificado se já foi ou não autenticado no firebase auth

## Fluxo de informações

1. Recebe o telefone informado
2. Consulta o firebase auth por meio do firebase-admin
3. Retorna um valor boleano notificando se existe ou não existe no firebase auth

## Response

```jsx
true | false
```

- Indica de o usuário possui ou não autenticação no firebase

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
gcloud functions deploy checkUserPhoneAlreadyRegistred \
  --runtime nodejs18 \
  --trigger-http \
  --entry-point checkUserPhoneAlreadyRegistred \
  --region southamerica-east1 \
  --allow-unauthenticated
```
