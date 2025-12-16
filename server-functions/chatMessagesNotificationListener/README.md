# chatMessagesNotificationListener

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável monitorar mensagens que são enviadas ao chat e disparar notificações por meio do expo notification

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-3c8114bb0bdb41849e10b1dc504de60f?pvs=21)

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

- Função disparada ao realizar envio de mensagem no chat (realtime dabase)

## Fluxo de informações

1. Recebe o evento disparado ao salvar uma mensagem no realtime no chat
2. Com os dados da mensagem é identificado o destinatário e seu token
3. DIspara notificação com o expo push token

## Response

Sem resposta

## Deploy

Criar uma Cloud Function manualmente no console Google Cloud com as seguintes configurações

```jsx
Geração: 1ª
Nome: chatMessagesNotificationListener
Localização: southamerica-east1 (SP)
Trigger: Firebase Realtime Database (Preview)
Event: Create
Database: realtimeID(sem 'http' e '.com')
Path: {chatId}/messages/{messageId}
Entry_Point: chatMessagesNotificationListener
Node: Versão 20
```

```jsx
gcloud functions deploy chatMessagesNotificationListener \
  --gen1 \
  --region=southamerica-east1 \
  --runtime=nodejs20 \
  --trigger-event=providers/google.firebase.database/eventTypes/ref.create \
  --trigger-resource='projects/_/instances/GOOGLE_CLOUD_PROJECT_NAME/refs/{chatId}/messages/{messageId}' \
  --entry-point=chatMessagesNotificationListener
```

- Na pasta `/chatMessagesNotificationListener` rode o comando `npm i`
- Depois rode o comando para gerar os arquivos JS:

    ```jsx
    npm run build
    ```

- Dentro da pasta `/chatMessagesNotificationListener/deploy`, copie os arquivos `index.js`e `package.json` para a Cloud Funcion já criada
- Defina o entryPoint como `chatMessagePushNotification`
