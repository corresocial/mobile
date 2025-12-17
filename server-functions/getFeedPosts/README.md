# getFeedPosts

<aside>
💡

REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por obter as postagens por localização, retornando um objeto contendo separadamente as postagens de acordo com o alcance (nearby, city, country)

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-d286bf02fc184cea91f2a0eca6e2ae99?pvs=21)

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
projects/GOOGLE_CLOUD_PROJECT_NAME/locations/LOCALE/functions/getFeedPosts
```

## Request

```jsx
{
	userId: string,
	searchParams: {
		searchLeaderPosts: boolean
		geohashes: string[]
    city: string
    country: string
	}
}
```

- **userId**: Id do usuário que fez a solicitação, usado para filtrar a localização (analitcs?)
- **searchParams:**
    - **searchLeaderPosts:** Define se o feed retornará somente postagens ou também postagens de líder (enquetes e abaixo assinados)
    - **geohashes**: Geohashes para consultar postagens próximas
    - **city**: Para consultar postagens na cidade
    - **country**: Para consultar postagens no pais

## Fluxo de informações

1. Recebe-se os parâmetros de busca e o id do usuário
2. Consulta postagens próximas por meio de geohash
3. Consulta postagens que possuem sua localização na cidade informada, ignorando as postagens próximas que já foram consultadas
4. Consulta postagens que possuem sua localização no país informado(Brasil), ignorando as postagens da cidade que já foram consultadas
5. Todas as postagens pesquisadas passam por um filtro de localização
    1. Postagens com localização privada: Não retornam o objeto de localização
    2. Postagens com localização aproximada: Recebem uma geohash aleatória gerada em um raio
    3. Postagens com localização pública: Retornam localização completa
6. Contrói um objeto contendo todas as postagens separadamente, podendo ou não incluir enquetes e abaixo assinados

## Response

```jsx
{
		nearby: PostsProximos[],
		city: PostsNaCidade[],
		country: PostsNoPaís[]
}

OU

{
		nearby: PostsProximos[] & EnquetesProximas[] & PetiçõesProximas,
		city: PostsNaCidade[] & EnquetesNaCidade[] & PetiçõesNaCidade,
		country: PostsNoPaís[] & EnquetesNoPais[] & PetiçõesNoPais
}
```

- **nearby**: Postagens próximas
- **city**: Postagens na cidade
- **country**: Postagens no país

## Deploy

<aside>
💡 É necessário ter o `gcloud sdk` instalado na máquina e ter o projeto correto selecionado (dev | prod)

</aside>

Para listar os projetos com o `gcloud sdk` e ver o selecionado use:

```tsx
gcloud projects list
&
gcloud config list project
```

Utilize o comando para selecionar o projeto:

```tsx
gcloud config set project [project]
```

<aside>
💡

Estar dentro do diretório raiz da cloud function que deseja realizar o deploy

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
gcloud functions deploy getFeedPosts \
  --runtime nodejs18 \
  --trigger-http \
  --entry-point getFeedPosts \
  --region southamerica-east1 \
  --allow-unauthenticated
```
