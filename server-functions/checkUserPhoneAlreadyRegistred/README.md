# checkUserPhoneAlreadyRegistred

- REPOSITÓRIO: [Cloud Functions](https://github.com/corre-social/cloud-functions)

>Função responsável por validar se o telefone que o usuário está tentando cadastrar já está sendo usado

## Configuração

Service account: `fn-check-phone` (`roles/firebaseauth.viewer`). Não usa segredos.

## Request

```jsx
{
	phoneNumber: string // formato E.164: +55(DDD)(Telefone) = +5569992846588
}
```

- **phoneNumber**: Número de telefone a ser verificado no Firebase Auth. Precisa estar no formato E.164 (`^\+[1-9]\d{7,14}$`); caso contrário a função retorna o erro `invalid-argument`.

## Fluxo de informações

1. Recebe o telefone informado e valida o formato E.164
2. Consulta o firebase auth por meio do firebase-admin
3. Retorna um valor booleano notificando se existe ou não existe no firebase auth

A função não loga o telefone nem o uid encontrado.

## Response

```jsx
true | false
```

- Indica se o usuário possui ou não autenticação no firebase

## Riscos

A função é chamada **antes do login**, então não exige autenticação e permite descobrir se um telefone tem conta no Corre (dado pessoal, LGPD). App Check ainda não está ativo: a constante `ENFORCE_APP_CHECK` em `index.ts` deve virar `true` quando o app enviar tokens de App Check. Veja as opções em "Riscos Residuais" no [README principal](../README.md).

## Deploy

<aside>
💡 É necessário ter o `gcloud sdk` instalado
</aside>

```jsx
npm run deploy
```
