# fetchAndSyncVacancyPosts

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-f9c15330cff04d29aea84c76625edb46?pvs=21)

Variáveis de aplicação

```
REPORT_RECIPIENT_EMAIL=''
SENDER_EMAIL=''
SENDER_APP_PASS=''
SERVICE_ACCOUNT=''
```

## Request

- Função disparada a cada n dias consultando a tabela de vagas e adaptando-os e persistindo nas postagens do aplicativo

## Fluxo de informações

1. Consulta as vagas na tabela
2. Reestrutura os dados para se adaptar ao app
3. Persiste na base de dados
4. Gera e envie relatório da base de dados gerados pelo sistema

## Response

(200) - fetched succesfully

(500) - error

## Deploy

- Na pasta `/fetchAndSyncVacancyPosts` rode o comando `npm i`
- Depois rode o comando para gerar os arquivos JS (caso ):

    ```jsx
    npm run build
    ```

- Dentro da pasta `/fetchAndSyncVacancyPosts/deploy`, verifique se os arquivos anteriores foram compilados dentro da pasta deploy
- Se quiser subir as variáveis de ambiente(.env) crie um arquivo igual no formato (.env.yaml) para poder subir o arquivo e configurar as variáveis (necessário somente no primeiro deploy)
- Rode o comando para fazer o deploy:

    ```bash
    export $(grep -v '^#' .env | xargs)

    gcloud functions deploy fetchAndSyncVacancyPosts \
      --gen2 \
      --region southamerica-east1 \
      --runtime nodejs20 \
      --source ./deploy \
      --entry-point fetchAndSyncVacancyPosts \
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
