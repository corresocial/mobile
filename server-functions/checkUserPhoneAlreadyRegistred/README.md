# checkUserPhoneAlreadyRegistred

- REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

>Função responsável por validar se o telefone que o usuário está tentando cadastrar já está sendo usado

## Configuração

Configure suas [Variáveis de Ambiente](https://www.notion.so/Vari-veis-de-Ambiente-a70ccd10fec84c5d8a9a70f3e0e9e2c2?pvs=21)


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
💡 É necessário ter o `gcloud sdk` instalado
</aside>

```jsx
npm run deploy
```

