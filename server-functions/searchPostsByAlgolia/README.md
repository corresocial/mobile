# searchPostsByAlgolia

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por obter as postagens por localização, retornando um objeto contendo separadamente as postagens de acordo com o alcance (nearby, city, country)

</aside>

## Configuração

[Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-e0a9eda5f9e74be3980cd5be10aa8b39?pvs=21)

### Configuração de console Google Cloud Platform

.env.yaml com algolia id e algolia key
ALGOLIA_ID=
ALGOLIA_KEY=

## Request

```jsx
export type RequestBody = {
    userId: Id
    searchText: string
    searchByRange: boolean
    searchParams: {
				searchText: string
		    range: string
		    city: string
		    country: string
		    macroCategory: MacroCategoriesType
		    category: string
		    tag: string
		    postType: PostType
		    coordinates: LatLong
		    geohashes: Geohashes
		}
}
```

- **userId**: Id do usuário que fez a solicitação, usado para filtrar a localização (analitcs?)
- searchText: Texto de busca
- searchByRange: Valor boleano para definir se a busca levará em conta a localização ou não
- **searchParams:**
    - **searchText**: Texto adicional para pesquisa mais detalhada.
    - **range**: Alcance da busca, podendo ser near, city ou country
    - **city**: Nome da cidade para pesquisa geográfica.
    - **country**: Nome do país para pesquisa geográfica.
    - **macroCategory**: Categoria macro de postagem para filtragem.
    - **category**: Categoria específica para filtragem.
    - **tag**: Tag específica para filtragem.
    - **postType**: Tipo de postagem (renda, cultura ou impacto).
    - **geohashes**: Lista de geohashes para pesquisa geográfica eficiente, buscando posts próximos

## Fluxo de informações

1. Recebe-se os parâmetros de busca
2. Gera os filtros de busca de acordo com os parâmetros recebidos
3. Realiza a busca no algalia
4. Todas as postagens resultantes da pesquisa passam por um filtro de localização
    1. Postagens com localização privada: Não retornam o objeto de localização
    2. Postagens com localização aproximada: Recebem uma geohash aleatória gerada em um raio
    3. Postagens com localização pública: Retornam localização completa
5. Contrói um objeto contendo todas as postagens separadamente de acordo com o alcance

## Response

```jsx
{
		nearby: PostsPróximos[],
		city: PostsNaCidade[],
		country: PostsNoPaís[]
}
```

- **nearby**: Postagens próximas
- **city**: Postagens na cidade
- **country**: Postagens no país

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
gcloud functions deploy searchPostsByAlgolia \
  --runtime nodejs18 \
  --trigger-http \
  --entry-point searchPostsByAlgolia \
  --region southamerica-east1 \
  --allow-unauthenticated
```
