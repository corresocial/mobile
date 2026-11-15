# Regras de segurança do Firebase (projeto `corresocialapp`)

Regras versionadas, com privilégio mínimo, para o que o app (`app/src`) acessa direto pelo SDK cliente. O Admin SDK (`server-functions/`, `cloud-functions`, `corre-bot`) **não** passa por estas regras.

## Arquivos

| Arquivo | Protege |
| --- | --- |
| `firestore.rules` | Firestore `(default)`. Cobre `users` (+ `private/contacts`, `private/location`), `posts`, `polls` e `petitions` (+ `responses`), `citizenRegister` e `impactReports`. Todo o resto fica negado, inclusive `citizenRegisters` e `citizens`. |
| `database.rules.json` | RTDB `corresocialapp-default-rtdb` (chat). Só participantes acessam a conversa e ninguém acessa a raiz. O dono controla o próprio nó, e as únicas escritas cruzadas permitidas são as que o app faz. |
| `database.rules.interim.json` | Hot-fix do RTDB: só troca `"true"` por `"auth != null"`. **Já aplicado em produção.** |
| `database-smas.rules.json` | RTDB `corresocialapp-smas` (instância desativada): nega tudo. |
| `storage.rules` | Bucket `corresocialapp.appspot.com`. Só aceita os caminhos do app (`pictures/{users,posts,petitions}/<timestamp>[-<uuid>].jpg` e `videos/posts/<timestamp>[-<uuid>].mp4`), com limite de tamanho e de tipo. Não permite sobrescrever arquivos nem listar pastas. |
| `storage-deny-all.rules` | Buckets `corresocialapp-backup`, `corresocialapp-backupt` e `corresocialapp`: nega tudo. |
| `firebase.json` / `.firebaserc` | Ligam cada arquivo ao seu banco ou bucket por meio de *targets* (`database:main`, `database:smas`, `storage:main`, `storage:backup`, `storage:backupt`, `storage:legacy`). |
| `firebase.interim.json` | Configuração usada só para publicar o hot-fix do RTDB. |
| `firebase.test.json` | Configuração dos emuladores usada pelos testes. |

A checagem de administrador é uma só: `users/{uid}.verified.admin == true`. Os papéis ficam em `verified.type`. Os pontos que ainda dependem de mudança no app ou no servidor estão marcados com `TODO(segurança)` nos arquivos de regras.

## Testes

Os testes ficam em `rules-tests/` e usam `@firebase/rules-unit-testing` com `node:test`. Eles precisam de Node 22, do `firebase-tools` e de Java 11 ou mais novo, que é exigido pelos emuladores.

```bash
cd firebase/rules-tests
npm install
# Se o Java não estiver no PATH, aponte JAVA_HOME para um JDK 11+ já instalado.
npm test   # sobe os emuladores (projeto demo-corre, sem tocar na nuvem) e roda test/*.test.mjs
```

Observação: o emulador do Storage avalia a sobrescrita de arquivo como `create`, e a produção avalia como `update`. Por isso as regras deixam `resource == null` explícito.

## Deploy (⚠️ exige aprovação antes de rodar)

Nenhum comando abaixo foi executado. Todos alteram produção. Rode a partir de `firebase/`:

```bash
cd firebase

# 1) Validar sem publicar
firebase deploy --only firestore:rules,database:main,storage --project corresocialapp --dry-run

# 2) Firestore
firebase deploy --only firestore:rules --project corresocialapp

# 3) RTDB do chat (use database:main enquanto a instância SMAS estiver desativada)
firebase deploy --only database:main --project corresocialapp
#    Todas as instâncias, inclusive a SMAS:
firebase deploy --only database --project corresocialapp

# 4) Storage (os 4 buckets), ou só o bucket do app com --only storage:main
firebase deploy --only storage --project corresocialapp

# Hot-fix do RTDB (já aplicado; fica aqui só como referência)
firebase deploy --config firebase.interim.json --only database:main --project corresocialapp
```

Antes de publicar:

- `storage.rules` usa `firestore.get()`. No primeiro deploy, o CLI pergunta se deve conceder `roles/firebaserules.firestoreServiceAgent` ao service agent do Storage. Essa pergunta é uma mudança de IAM, então precisa de aprovação separada. Sem esse papel, os fluxos atuais continuam funcionando; só a exclusão por líder/admin de arquivos com `ownerId` deixa de funcionar.
- `storage.rules` exige `contentType` `image/*` ou `video/*`. O app não envia `contentType` no `putFile`, então vale confirmar em aparelho Android e iOS que o tipo inferido não é `application/octet-stream`.
- Alguns fluxos passam a funcionar porque hoje estão bloqueados pelas regras publicadas: `users/{uid}/private/*`, `polls|petitions/*/responses`, `citizenRegister` e `impactReports`. Outros deixam de funcionar ou mudam de comportamento. Os dois casos estão listados no relatório do PR.
