
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
6. Criar o arquivo `.env` na raiz do projeto `/app` - ver `env.sample`
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

# Arquitetura e Organização do Código (App)

Este documento descreve a estrutura de pastas e a arquitetura do aplicativo móvel (`/app`), facilitando a navegação e o entendimento do código fonte.

## 🏗️ Padrão Arquitetural

O projeto segue princípios de **Clean Architecture** (Arquitetura Limpa), separando o código em camadas de responsabilidade bem definidas. Isso garante que a interface do usuário (Presentation) esteja desacoplada das regras de negócio (Domain) e das implementações externas (Infrastructure/Data).

## 📂 Estrutura de Diretórios (`src/`)

### 1. `domain/` (Domínio & Regras de Negócio)
Esta é a camada mais importante, contendo o "coração" da aplicação. Ela define **O QUE** o aplicativo faz, independente de banco de dados ou interface.
*   **Conteúdo**: Tipos TypeScript (`types.ts`), interfaces de modelos e definições de entidades.
*   **Organização**: Dividido por contextos de negócio (ex: `chat`, `user`, `post`, `smas`, `poll`).
*   **Exemplo**: `domain/user/userTypes.ts` define como é um usuário no sistema.

### 2. `data/` (Dados & Implementação de Repositórios)
Responsável por buscar e persistir dados. Esta camada implementa as interfaces definidas no domínio.
*   **Conteúdo**: Repositórios, Mappers (transformam dados da API para o formato do Domínio) e DTOs (Data Transfer Objects).
*   **Função**: Faz a ponte entre o `infrastructure` (API/Firebase) e o `domain`. Se trocarmos o Firebase por outro backend, as mudanças ocorreriam principalmente aqui.

### 3. `infrastructure/` (Infraestrutura & Serviços Externos)
Contém implementações concretas de serviços externos e configurações de baixo nível.
*   **Conteúdo**: Configurações de API (`api/`), tipos específicos de serviços externos (ex: tipos do Algolia), e integrações diretas.
*   **Função**: Lidar com detalhes técnicos de comunicação externa.

### 4. `services/` (Serviços de Aplicação)
Contém lógica que orquestra operações, muitas vezes conectando UI e Dados, ou encapsulando lógica de validação complexa.
*   **Conteúdo**: Funções de utilidade de negócio, validadores e lógica de processamento (ex: `notificationService`, `paymentService`).

### 5. `presentation/` (Interface do Usuário)
Tudo o que o usuário vê e interage. É a camada mais externa.
*   **`screens/`**: Telas do aplicativo, organizadas por fluxo (ex: `auth`, `home`, `profile`).
*   **`components/`**: Componentes reutilizáveis de UI (botões, cards, inputs).
*   **`hooks/`**: Custom Hooks do React para lógica de estado da view (ex: `useAuth`, `usePosts`).
*   **`navigation/`**: Configuração de rotas e navegadores (Stack, Tab, Drawer).
*   **`assets/`**: Imagens, fontes e ícones locais.
*   **`theme/`**: Definições de estilo global (cores, fontes, espaçamentos).
*   **`infra/`**: (Ocasionalmente presente em presentation) Adaptadores de view específicos.

### 6. `contexts/` (Gerenciamento de Estado Global)
Utiliza a Context API do React para compartilhar estado global pela aplicação.
*   **Conteúdo**: Providers para Autenticação (`AuthContext`), Tema, Dados de Usuário, etc.

### 7. `newutils/` (Utilitários Gerais)
Funções auxiliares puras que podem ser usadas em qualquer parte do sistema.
*   **Conteúdo**: Formatadores de data, máscaras de input (CPF/CNPJ), cálculos matemáticos simples, logs.

### 8. `@types/`
Definições de tipos globais do TypeScript ou sobresutras de tipos de bibliotecas externas (ex: extensão de tipos do `styled-components` ou declaração de arquivos `.png`).

---

## 🔄 Fluxo de Dados Comum

1.  **User Action**: Usuário clica em um botão na `presentation/screens`.
2.  **Hook/Context**: A tela chama uma função de um `hook` ou `context`.
3.  **Data/Service**: O hook chama um método da camada `data` (repositório).
4.  **Infrastructure**: O repositório usa a `infrastructure` (ex: Firebase ou Axios) para buscar os dados.
5.  **Mapper**: Os dados brutos voltam, são convertidos por um Mapper em `data`.
6.  **Domain**: O objeto retornado segue a estrutura definida em `domain`.
7.  **Update UI**: A interface é atualizada com os dados do domínio.



