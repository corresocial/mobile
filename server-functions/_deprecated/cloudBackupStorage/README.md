# cloudBackupStorage

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por realizar backup dos assets(imagens e documentos) que são enviados para o storage principal

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-683892bc23ed4fdbbf7b6619261b748d?pvs=21)

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

BACKUP_BUCKET

```jsx
gs://bucket-backup-name
```

## Request

- Função disparada ao realizar upload no storage principal

## Fluxo de informações

1. Recebe o arquivo que foi armazenado no storage principal
2. Clona ele no storage de backup

## Response

Sem resposta

## Deploy

<aside>
💡 É necessário ter o `gcloud sdk` instalado na máquina

</aside>

<aside>
💡 Estar dentro do diretório raiz da cloud function que deseja realizar o deploy

</aside>

É necessário converter o código para JavaScript antes de fazer o deploy, executando diretamente da pasta da função (Certifique-se de que no executor npm está o bucketID configurado no package.json)

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
gcloud functions deploy cloudBackupStorage \
        --runtime nodejs18 \
        --trigger-resource [bucketName]\
        --trigger-event google.storage.object.finalize \
        --region southamerica-east1 \
```
