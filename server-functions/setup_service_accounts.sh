#!/usr/bin/env bash
# setup_service_accounts.sh - Cria as service accounts de runtime de cada função e concede
# o mínimo de papéis no projeto (a tabela está no README, seção "Uma service account por função").
#
# Não concede acesso a segredos: isso é feito por segredo, pelo setup_secrets.sh.
# Rode ANTES do setup_secrets.sh e do primeiro deploy em um projeto novo (ex.: produção).
#
# Por padrão só imprime os comandos (dry-run). Para executar de verdade use --apply.
#
# Compatível com bash 3.2 (macOS).

set -euo pipefail

PROJECT="${GCP_PROJECT:-corresocialapp}"
ACCOUNT="${GCP_ACCOUNT:-}"
APPLY=0
ONLY=""

usage() {
	cat <<EOF
Uso: bash setup_service_accounts.sh [--apply] [--only fn-a,fn-b]

  (sem flags)  Dry-run: imprime os comandos gcloud e não altera nada.
  --apply      Cria as service accounts e concede os papéis.
  --only       Processa só as contas listadas (ex.: --only fn-check-phone,fn-feed,fn-search).
               Útil quando uma função (Stripe, Discord) não vai ser implantada.
  -h, --help   Mostra esta ajuda.

Variáveis:
  GCP_PROJECT  Projeto GCP (padrão: corresocialapp)
  GCP_ACCOUNT  Conta do gcloud a usar (opcional; vira --account=...)
EOF
}

while [ $# -gt 0 ]; do
	case "$1" in
		--apply) APPLY=1 ;;
		--only)
			[ $# -ge 2 ] || { echo "Erro: --only precisa de uma lista" >&2; exit 2; }
			ONLY="$(printf '%s' "$2" | tr ',' ' ')"
			shift ;;
		-h|--help) usage; exit 0 ;;
		*) echo "Erro: argumento desconhecido: $1" >&2; usage >&2; exit 2 ;;
	esac
	shift
done

ACCOUNT_FLAG=""
[ -n "$ACCOUNT" ] && ACCOUNT_FLAG="--account=$ACCOUNT"

# nome da service account -> função que a usa
SERVICE_ACCOUNTS="fn-check-phone fn-feed fn-search fn-stripe fn-discord"

display_name_for() {
	case "$1" in
		fn-check-phone) echo "Runtime: checkUserPhoneAlreadyRegistred" ;;
		fn-feed) echo "Runtime: getFeedPosts" ;;
		fn-search) echo "Runtime: searchPostsByAlgolia" ;;
		fn-stripe) echo "Runtime: stripeApi" ;;
		fn-discord) echo "Runtime: discordIntegration" ;;
		*) echo "Erro: service account sem descrição: $1" >&2; return 1 ;;
	esac
}

# Papel no projeto (vazio = nenhum). O acesso aos segredos vem do setup_secrets.sh.
project_role_for() {
	case "$1" in
		fn-check-phone) echo "roles/firebaseauth.viewer" ;;
		fn-feed) echo "roles/datastore.viewer" ;;
		fn-stripe) echo "roles/datastore.user" ;;
		fn-search|fn-discord) echo "" ;;
		*) echo "Erro: service account sem papel mapeado: $1" >&2; return 1 ;;
	esac
}

if [ -n "$ONLY" ]; then
	for name in $ONLY; do
		case " $SERVICE_ACCOUNTS " in *" $name "*) ;; *) echo "Erro: conta desconhecida em --only: $name" >&2; exit 2 ;; esac
	done
	SERVICE_ACCOUNTS="$ONLY"
fi

run() {
	echo "+ $*"
	if [ "$APPLY" -eq 0 ]; then
		return 0
	fi
	"$@"
}

echo "Projeto: $PROJECT"
if [ "$APPLY" -eq 0 ]; then
	echo "Modo: dry-run (nada será alterado). Use --apply para executar."
else
	echo "Modo: APPLY (vai alterar o projeto $PROJECT)."
fi
echo ""

for name in $SERVICE_ACCOUNTS; do
	email="${name}@${PROJECT}.iam.gserviceaccount.com"
	role="$(project_role_for "$name")"
	display="$(display_name_for "$name")"

	echo "[$name]"
	exists=0
	if [ "$APPLY" -eq 1 ]; then
		# shellcheck disable=SC2086
		if gcloud iam service-accounts describe "$email" --project="$PROJECT" $ACCOUNT_FLAG >/dev/null 2>&1; then
			exists=1
		fi
	fi
	if [ "$exists" -eq 1 ]; then
		echo "  já existe: $email"
	else
		# shellcheck disable=SC2086
		run gcloud iam service-accounts create "$name" --project="$PROJECT" $ACCOUNT_FLAG --display-name="$display"
	fi

	if [ -n "$role" ]; then
		# --condition=None evita o prompt interativo em projetos com bindings condicionais
		# shellcheck disable=SC2086
		run gcloud projects add-iam-policy-binding "$PROJECT" $ACCOUNT_FLAG --member="serviceAccount:${email}" --role="$role" --condition=None --quiet
	else
		echo "  sem papel no projeto"
	fi
	echo ""
done

echo "Pronto. Próximo passo: bash setup_secrets.sh (com GCP_PROJECT=$PROJECT)."
