#!/bin/bash

# config_all.sh - DESCONTINUADO
#
# Este script gerava arquivos .env.yaml com os segredos em texto puro para o
# `gcloud functions deploy --env-vars-file`. Esses valores vazaram em logs de
# auditoria e foram movidos para o Secret Manager.
#
# Mantido só como aviso (em vez de apagado) porque o `npm run config:all` e a
# documentação antiga ainda apontam para ele: assim quem rodar recebe a
# instrução certa e o processo falha, em vez de recriar segredos em texto puro.

echo "config_all.sh foi descontinuado: os segredos agora ficam no Secret Manager." >&2
echo "" >&2
echo "Novo fluxo:" >&2
echo "  1. Rotacione as chaves e preencha server-functions/.env (veja .env.sample)" >&2
echo "  2. bash setup_secrets.sh" >&2
echo "  3. npm run deploy (em cada função) ou bash deploy_all.sh" >&2
echo "" >&2
echo "Apague arquivos */.env.yaml antigos: eles não são mais usados." >&2
exit 1
