# Mobile

>Para mais detalhes sobre o conteúdo deste repositório, acesse: [mobile-dev](https://github.com/corre-social/mobile/tree/dev)

## Ambiente de execução

>Windows 10 Pro x64

>VSCode v1.74.3

>npm v8.19.3

>node v16.19.0

**Dependências globais instaladas:**

* expo-cli@6.1.0  
* eslint@8.28.0
* sharp-cli@2.1.0 (Developing for Web)

**Execute `npm install -g nome_da_dependência` para instalar as dependências globalmente**

**Execute `npm list -g --depth=0` para listar as dependências globais**

# Instalação

*  1 - Clone o repositório com o comando: `git clone https://github.com/corre-social/mobile.git ./`
*  2 - Ainda no git terminal, alterne para a branch dev com o comando `git checkout dev`
*  3 - Abra o VSCode dentro da pasta `/app`
*  4 - Execute o comando `npm i` no terminal para intalar as dependências
*  5 - Adicionar o arquivo `.env` à raiz do projeto `/app`
*  6 - Reinicie o VSCode, as instalações de tipagem por vezes exigem isso
*  7 - No terminal, na primeira vez que for executar, utilize `expo r -c` para limpar o cache, e posteriormente `npx expo start`

# Extenções

### Essenciais

* ESLint
* EditorConfig for VS Code

### Recomendadas

* Color Highlight
* Todo Tree
* Omni Theme

# Execução

* Primeira execução, no terminal utilize `expo r -c`, posteriormente utilize apenas `npx expo start`
* ESLint, `npm run check` lista todas as inconsistências.
* ESLint, `npm run format` corrige erros e warns leves.

**E Voilà!**

