
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

### Extensões Essenciais

- ESLint
- EditorConfig for VS Code
- Recomendadas
    - Todo Tree

### Scripts Úteis

- `npm run check`: Lista todas as inconsistências de lint.
- `npm run format`: Corrige automaticamente os erros de formatação.

**E Voilà!**

## Contribuir

# Como contribuir

Para contribuir é muito simples,

1. Utilizar nossos lints e configurações
2. Escolher uma issue
3. Comentar diretamente nele a data estimada de entrega, se atribuir no github e no discord `#tech` que está pegando a issue, enviar link.

Sempre que for começar uma nova contribuição, recomece o repositório.

Os commits devem seguir os padrões de [Commit Pattern](https://www.notion.so/corre/Manual-de-colabora-o-GitHub-50d8a7d057724c398d01a100a38d703b?pvs=4).

```bash
git clone https://github.com/corre-social/mobile/
git checkout dev
# copiar arquivos .env.development e .env.production com variáveis para app
cd mobile/app
git pull
npm i
git checkout -b feat/fix/XXXX # cria a nova branch que irá trabalhar
# realizar todos os commits e alterações
git commit -m "feat/fix/XXX: descrição"
```

💡 Todo esse processo de alternância de branchs, commits e publicação de novas branchs no github pode ser facilmente realizado pelo próprio VS Code na aba de Source Control, veja [Como gerenciar o git pelo VSCode](https://www.youtube.com/watch?v=HIqyLRKv-YE)

💡 Criar Pull Request diretamente no repositório online.

# Detalhes do código
Consulte a [documentação do código](https://www.notion.so/corre/Documenta-o-do-c-digo-65156ce6cfde4357940ebade8a22ebbf?pvs=4)


