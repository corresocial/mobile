
# Ambiente

Esta aplicação utiliza **Development Builds** do Expo. Diferente do Expo Go, uma development build é uma versão compilada do seu aplicativo que inclui todas as bibliotecas nativas necessárias para o projeto, permitindo testar funcionalidades que exigem código nativo personalizado.

Para saber mais sobre o conceito e como funciona, consulte a documentação oficial:
- [Introduction to Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)

# Instalação

1. **Dependências globais instaladas:**
    - npm@10.8.0
2. Clone o repositório com o comando: `git clone https://github.com/corre-social/mobile.git ./`
3. Ainda no git terminal, alterne para a branch dev com o comando `git checkout dev`
4. Abra o VSCode dentro da pasta `/app`
5. Execute o comando `npm i` no terminal para intalar as dependências
6. Criar os arquivos `.env.development` e `.env.production` à raiz do projeto `/app`, as variáveis estão [aqui](https://www.notion.so/corre/Ambientes-de-desenvolvimento-c336978f4cea4c43bcfc2bc52448b1f2?pvs=4)
7. Reinicie o VSCode, as instalações de tipagem por vezes exigem isso
8. Pegue os arquivos do google-services no Notion e coloque-os nos diretórios apropriados:
    - **Android**: `app/build/dev/google-services.json`
    - **iOS**: `app/build/dev/google-services-info.plist`
9. **Importante para a build**: Os arquivos "google-services" e ".env*" não pode estar no `.gitignore`, pois ele será omitido do processo de build do EAS. Comente a linha correspondente no `.gitignore` temporariamente, gere a build e depois descomente-a.
10. Execute o comando para gerar a build de desenvolvimento: `NODE_ENV=development eas build --clear-cache -e development-build -p android` ou `ios`.
11. Instale a build gerada no seu emulador ou dispositivo físico.
12. Execute a aplicação com o comando: `npm run dev`.

### Variáveis de ambiente e segredos

Toda variável importada de `@env` (via `react-native-dotenv`, em `src/infrastructure/environment`) é **embutida no bundle JavaScript** distribuído nas lojas e nas atualizações OTA, ou seja, é pública. No `.env` do app só podem existir valores que são públicos por natureza:

- Configuração do Firebase client (`FIREBASE_*`) e IDs de cliente OAuth (`AUTH_*_CLIENT_ID`)
- `STRIPE_PUBLISHABLE_KEY` e `DSN_SENTRY`
- `ALGOLIA_KEY`: deve ser uma chave **Search-Only**, nunca a Admin/Write key
- Chaves do Google Maps: devem estar restritas por app (bundle ID / SHA-1) e por API no Google Cloud Console

Segredos de serviços de terceiros (Stripe secret key, webhooks do Discord, token do Notion) ficam **apenas** nas Cloud Functions (`server-functions/`, veja o [README](../server-functions/README.md)), e o app chama as funções via `firebaseFunctions.httpsCallable`.

**`SENTRY_AUTH_TOKEN`** é usado somente em tempo de build (upload de source maps pelo plugin `@sentry/react-native/expo`) e **não deve ser importado de `@env`**. Cadastre-o como variável do EAS com visibilidade `secret`:

```bash
eas env:set --name SENTRY_AUTH_TOKEN --value <token> --environment production --visibility secret
```

Repita com `--environment development` se as builds de desenvolvimento também enviarem source maps. Em builds locais (`--local`), exporte a variável no terminal antes do build.

> As variáveis `NOTION_FALECONOSCO_KEY`, `NOTION_FALECONOSCO_ID`, `NOTION_APPICONS_KEY` e `NOTION_APPICONS_ID` não são mais usadas pelo app e podem ser removidas dos arquivos `.env` locais.

### Extensões Essenciais

- ESLint
- EditorConfig for VS Code
- Recomendadas
    - Todo Tree

### Scripts Úteis

- `npm run check`: Lista todas as inconsistências de lint.
- `npm run format`: Corrige automaticamente os erros de formatação.

**E Voilà!**


