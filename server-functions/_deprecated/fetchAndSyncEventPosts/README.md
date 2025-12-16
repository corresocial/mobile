# fetchAndSyncEventPosts

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-f4913c95daad4e2fafb62feea20f1a2a?pvs=21)

Variáveis de aplicação

```
REPORT_RECIPIENT_EMAIL=''
SENDER_EMAIL=''
SENDER_APP_PASS=''
SERVICE_ACCOUNT=''
```

## Request

- Função disparada a cada n dias consultando o site de eventos e adaptando-os e persistindo nas postagens do aplicativo

## Fluxo de informações

1. Consulta eventos do site
2. Reestrutura os dados para se adaptar ao app
3. Persiste na base de dados
4. Gera e envie relatório da base de dados gerados pelo sistema

## Response

(200) - fetched succesfully

(500) - error

## Deploy

<aside>
💡 Foi utilizaro uma cloud function de 2ª geração pela demora de execução dos processos que ultrapassam o limie das funções de 1ª geração (60s)

</aside>

- Na pasta `/fetchAndSyncEventPosts` rode o comando `npm i`
- Verifique as variáveis de ambiente
- Depois rode o comando para gerar os arquivos JS (caso ):

    ```jsx
    npm run build
    ```

- Dentro da pasta `/fetchAndSyncEventPosts/deploy`, verifique se os arquivos anteriores foram compilados dentro da pasta deploy
- Se quiser subir as variáveis de ambiente(.env) crie um arquivo igual no formato (.env.yaml) para poder subir o arquivo e configurar as variáveis (necessário somente no primeiro deploy)
- Rode o comando para fazer o deploy:

    ```bash
    export $(grep -v '^#' .env | xargs)

    gcloud functions deploy fetchAndSyncEventPosts \
      --gen2 \
      --region southamerica-east1 \
      --runtime nodejs20 \
      --source ./deploy \
      --entry-point fetchAndSyncEventPosts \
      --allow-unauthenticated \
      --trigger-http \
      --timeout 500s \
      --service-account ${SERVICE_ACCOUNT} \
      --env-vars-file .env.yaml

    ```


Obs: caso algum erro acontece, verifique se os arquivos com as chaves foram criado corretamente

## Scheduler

- Criar uma job no Cloud Scheduler ex:

    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/2e43cb90-bc84-434c-995b-81253273dee1/1b8700ad-3fbc-4a73-b9f6-d88070d25f10/Untitled.png)

    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/2e43cb90-bc84-434c-995b-81253273dee1/01bd8bee-4354-4722-89f3-4fa86c8b32eb/Untitled.png)
