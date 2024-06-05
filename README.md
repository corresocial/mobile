# Como contribuir

Para contribuir é muito simples, 

1. Utilizar nossos lints e configurações
2. Escolher uma issue
3. Comentar diretamente nele a data estimada de entrega, se atribuir no github e no discord `#tech` que está pegando a issue, enviar link.

### Instalação

1. **Dependências globais instaladas:**
    - npm@10.8.0
2. **Execute `npm install -g nome_da_dependência` para instalar as dependências globalmente**
3. **Execute `npm list -g --depth=0` para listar as dependências globais**
4. Clone o repositório com o comando: `git clone https://github.com/corre-social/mobile.git ./`
5. Ainda no git terminal, alterne para a branch dev com o comando `git checkout dev`
6. Abra o VSCode dentro da pasta `/app`
7. Execute o comando `npm i` no terminal para intalar as dependências
8. Adicionar o arquivo `.env` à raiz do projeto `/app`, as variáveis estão [aqui](https://www.notion.so/corre/Ambientes-de-desenvolvimento-c336978f4cea4c43bcfc2bc52448b1f2?pvs=4)
9. Reinicie o VSCode, as instalações de tipagem por vezes exigem isso
10. No terminal, na primeira vez que for executar, utilize `npx expo start —clear` para limpar o cache, e posteriormente `npx expo start`

### Extensões Essenciais

- ESLint
- EditorConfig for VS Code
- Jest Runner
- Recomendadas
    - CodeWhisperer(autocomplete Shell)
    - Amazon Q(autocomplete code)
    - Color Highlight
    - Todo Tree
    - Omni Theme

### Execução

- Primeira execução, no terminal utilize `npx expo start —clear`, posteriormente utilize apenas `npx expo start`
- ESLint, `npm run check` lista todas as inconsistências.
- ESLint, `npm run format` corrige erros e warns leves.

**E Voilà!**

## Contribuir

Sempre que for começar uma nova contribuição, recomece o repositório. 

Os commits devem seguir os padrões de [Commit Pattern](https://www.notion.so/corre/Manual-de-colabora-o-GitHub-50d8a7d057724c398d01a100a38d703b?pvs=4).

```bash
git clone https://github.com/corre-social/mobile/
git checkout dev
# copiar arquivo .env com variáveis para app
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


