# searchPostsByAlgolia

<aside>
💡 REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

</aside>

<aside>
💡 Função responsável por obter as postagens por localização, retornando um objeto contendo separadamente as postagens de acordo com o alcance (nearby, city, country)

</aside>

## Configuração

Service account: `fn-search` (sem papéis no projeto).

`ALGOLIA_ID` e `ALGOLIA_KEY` ficam no Secret Manager e chegam à função como variáveis de ambiente via `--set-secrets` (veja o `package.json`). Use uma chave Algolia **só de busca** (ACL `search`). Para criar/rotacionar os segredos, use o `setup_secrets.sh` da raiz (veja o [README principal](../README.md)).

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

### Validação

Os campos abaixo entram nos filtros do Algolia e são validados em `src/validateSearchRequest.ts` (valores vazios são aceitos, como antes). Fora do formato, a função retorna `invalid-argument`:

- **postType**: `income`, `socialImpact` ou `culture`
- **macroCategory**: valores de `MacroCategoriesType` (`domain/entities/post`)
- **geohashes**: até 50 geohashes (base32, 1 a 12 caracteres)
- **city** / **country**: letras (com acento), números, espaço, `.`, `-` e apóstrofo; até 100 caracteres
- **category**: identificador (`[A-Za-z0-9_-]`, até 64)
- **tag**: letras (com acento), números, espaço, `_`, `+`, `.` e `-`; até 64
- **searchText**: texto de até 512 caracteres

Cidade, país, categoria e tag também vão entre aspas no filtro.

## Fluxo de informações

1. Recebe-se os parâmetros de busca e valida os campos usados nos filtros
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

Dentro da pasta da função:

```bash
npm run deploy
```

O comando compila o TypeScript (`npm run build`, saída em `deploy/`) e executa o `deploy-cloud-function` do `package.json` (runtime `nodejs22`, service account `fn-search` e `--set-secrets`). Não faça o deploy manualmente com outras flags: sem `--service-account` a função passa a rodar com a service account padrão, e sem `--set-secrets` fica sem as credenciais do Algolia.
