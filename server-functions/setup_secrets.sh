#!/usr/bin/env bash
# setup_secrets.sh - Cria/atualiza no Secret Manager os segredos das Cloud Functions
# e concede roles/secretmanager.secretAccessor em CADA segredo somente para a
# service account (runtime) da função que o usa. Nunca concede no nível do projeto.
#
# Rode depois de rotacionar as chaves e preencher server-functions/.env
# (veja .env.sample). Os valores são enviados ao gcloud via stdin: nunca são
# impressos nem passados como argumento de linha de comando.
#
# Compatível com bash 3.2 (macOS).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
PROJECT="${GCP_PROJECT:-corresocialapp}"
SECRET_LOCATION="southamerica-east1"
SECRETS="ALGOLIA_ID ALGOLIA_KEY STRIPE_SECRET_KEY FALECONOSCO_WEBHOOK ERROS_WEBHOOK DENUNCIAR_WEBHOOK"
DRY_RUN=0

usage() {
	cat <<EOF
Uso: bash setup_secrets.sh [--dry-run]

  --dry-run   Só imprime os comandos gcloud (sem valores); não altera nada.
  -h, --help  Mostra esta ajuda.

Variáveis:
  GCP_PROJECT  Projeto GCP (padrão: corresocialapp)

Segredos lidos de server-functions/.env:
  ALGOLIA_ID, ALGOLIA_KEY                            -> fn-search
  STRIPE_SECRET_KEY                                  -> fn-stripe
  FALECONOSCO_WEBHOOK, ERROS_WEBHOOK, DENUNCIAR_WEBHOOK -> fn-discord
EOF
}

while [ $# -gt 0 ]; do
	case "$1" in
		--dry-run) DRY_RUN=1 ;;
		-h|--help) usage; exit 0 ;;
		*) echo "Erro: argumento desconhecido: $1" >&2; usage >&2; exit 2 ;;
	esac
	shift
done

# Service account de runtime que pode ler cada segredo
service_account_for() {
	case "$1" in
		ALGOLIA_ID|ALGOLIA_KEY) echo "fn-search@${PROJECT}.iam.gserviceaccount.com" ;;
		STRIPE_SECRET_KEY) echo "fn-stripe@${PROJECT}.iam.gserviceaccount.com" ;;
		FALECONOSCO_WEBHOOK|ERROS_WEBHOOK|DENUNCIAR_WEBHOOK) echo "fn-discord@${PROJECT}.iam.gserviceaccount.com" ;;
		*) echo "Erro: segredo sem service account mapeada: $1" >&2; return 1 ;;
	esac
}

# Lê KEY=valor do .env sem executá-lo (não usa `source`). Aceita "export KEY=valor"
# e valor entre aspas simples ou duplas. Não aceita comentário na mesma linha.
# Se a chave aparecer mais de uma vez, a última vence.
env_value() {
	local wanted="$1" line key value found=""
	[ -f "$ENV_FILE" ] || { printf '%s' ""; return 0; }
	while IFS= read -r line || [ -n "$line" ]; do
		line="${line%$'\r'}"
		line="${line#"${line%%[![:space:]]*}"}"
		case "$line" in ''|'#'*) continue ;; esac
		line="${line#export }"
		case "$line" in *=*) ;; *) continue ;; esac
		key="${line%%=*}"
		key="${key%"${key##*[![:space:]]}"}"
		[ "$key" = "$wanted" ] || continue
		value="${line#*=}"
		value="${value#"${value%%[![:space:]]*}"}"
		value="${value%"${value##*[![:space:]]}"}"
		case "$value" in
			\"*\") value="${value#\"}"; value="${value%\"}" ;;
			\'*\') value="${value#\'}"; value="${value%\'}" ;;
		esac
		found="$value"
	done < "$ENV_FILE"
	printf '%s' "$found"
}

# Avisos de formato (sem imprimir o valor)
check_format() {
	local name="$1" value="$2"
	case "$name" in
		*_WEBHOOK)
			case "$value" in
				https://discord.com/api/webhooks/*|https://discordapp.com/api/webhooks/*|https://ptb.discord.com/api/webhooks/*|https://canary.discord.com/api/webhooks/*) ;;
				*) echo "  Aviso: $name não parece uma URL de webhook do Discord (https://discord.com/api/webhooks/...)." ;;
			esac
			;;
		STRIPE_SECRET_KEY)
			case "$value" in
				sk_live_*|rk_live_*) ;;
				sk_test_*|rk_test_*) echo "  Aviso: STRIPE_SECRET_KEY é uma chave de TESTE." ;;
				*) echo "  Aviso: STRIPE_SECRET_KEY não começa com sk_/rk_." ;;
			esac
			;;
	esac
}

# Imprime o comando e o executa (no --dry-run só imprime)
run() {
	echo "+ $*"
	if [ "$DRY_RUN" -eq 0 ]; then
		"$@"
	fi
}

echo "========================================"
echo "  Secret Manager - Cloud Functions"
echo "========================================"
echo "Projeto: $PROJECT"
echo "Região dos segredos: $SECRET_LOCATION"
[ "$DRY_RUN" -eq 1 ] && echo "Modo: --dry-run (nada será alterado)"
echo ""
echo "Lembrete: a API do Secret Manager precisa estar ativada no projeto:"
echo "  gcloud services enable secretmanager.googleapis.com --project=$PROJECT"
echo ""

# Arquivos do fluxo antigo (segredos em texto puro): só verifica a existência
for old_file in "$SCRIPT_DIR"/*/.env.yaml; do
	[ -e "$old_file" ] || continue
	echo "Aviso: ${old_file#"$SCRIPT_DIR"/} é do fluxo antigo (segredos em texto puro) e não é mais usado. Apague-o."
done

# 1. Valida os valores antes de alterar qualquer coisa
if [ ! -f "$ENV_FILE" ]; then
	if [ "$DRY_RUN" -eq 1 ]; then
		echo "Aviso: $ENV_FILE não encontrado (ok no --dry-run)."
	else
		echo "Erro: $ENV_FILE não encontrado. Copie .env.sample para .env e preencha com as chaves NOVAS (rotacionadas)." >&2
		exit 1
	fi
fi

problems=""
for name in $SECRETS; do
	value="$(env_value "$name")"
	if [ -z "$value" ]; then
		problems="$problems $name(vazio)"
		continue
	fi
	case "$value" in
		*YOUR_*) problems="$problems $name(placeholder do .env.sample)"; continue ;;
	esac
	check_format "$name" "$value"
done
value=""

if [ -n "$problems" ]; then
	if [ "$DRY_RUN" -eq 1 ]; then
		echo "Aviso: valores ausentes ou inválidos no .env:$problems"
	else
		echo "Erro: valores ausentes ou inválidos no .env:$problems" >&2
		exit 1
	fi
fi

# 2. Pré-checagens (somente leitura)
if [ "$DRY_RUN" -eq 0 ]; then
	if ! command -v gcloud >/dev/null 2>&1; then
		echo "Erro: gcloud não encontrado. Instale o Google Cloud SDK." >&2
		exit 1
	fi

	missing_sa=""
	for sa_name in fn-search fn-stripe fn-discord; do
		sa="${sa_name}@${PROJECT}.iam.gserviceaccount.com"
		if ! gcloud iam service-accounts describe "$sa" --project="$PROJECT" >/dev/null 2>&1; then
			missing_sa="$missing_sa $sa"
		fi
	done
	if [ -n "$missing_sa" ]; then
		echo "Erro: service account(s) não encontrada(s) ou sem permissão para ler:$missing_sa" >&2
		exit 1
	fi

	if [ -t 0 ]; then
		printf 'Criar/atualizar %s segredos no projeto %s? [s/N] ' "$(echo $SECRETS | wc -w | tr -d ' ')" "$PROJECT"
		read -r answer
		case "$answer" in
			s|S|sim|SIM|y|Y) ;;
			*) echo "Cancelado."; exit 1 ;;
		esac
	fi
fi

# 3. Cria o segredo (se não existir), adiciona nova versão e concede acesso só à SA da função
for name in $SECRETS; do
	sa="$(service_account_for "$name")"
	echo ""
	echo "== $name -> $sa"

	if [ "$DRY_RUN" -eq 1 ]; then
		echo "+ (se não existir) gcloud secrets create $name --project=$PROJECT --replication-policy=user-managed --locations=$SECRET_LOCATION"
	elif gcloud secrets describe "$name" --project="$PROJECT" >/dev/null 2>&1; then
		echo "Segredo já existe."
	else
		run gcloud secrets create "$name" --project="$PROJECT" \
			--replication-policy=user-managed --locations="$SECRET_LOCATION"
	fi

	# O valor vai por stdin (printf é builtin: não aparece em `ps`)
	echo "+ printf '%s' \"\$$name\" | gcloud secrets versions add $name --project=$PROJECT --data-file=-"
	if [ "$DRY_RUN" -eq 0 ]; then
		printf '%s' "$(env_value "$name")" | gcloud secrets versions add "$name" --project="$PROJECT" --data-file=-
	fi

	run gcloud secrets add-iam-policy-binding "$name" --project="$PROJECT" \
		--member="serviceAccount:$sa" --role=roles/secretmanager.secretAccessor \
		--condition=None --format=none
done

echo ""
echo "========================================"
if [ "$DRY_RUN" -eq 1 ]; then
	echo "Dry-run concluído. Nada foi alterado."
else
	echo "Segredos atualizados."
fi
echo ""
echo "Próximos passos:"
echo "  1. Faça o deploy para as funções lerem a nova versão (:latest é lido na subida da instância):"
echo "       bash deploy_all.sh   ou   cd <função> && npm run deploy"
echo "  2. Confira se as funções não têm mais as variáveis antigas em texto puro (ver README)."
echo "  3. Depois de validar, desative as versões antigas:"
echo "       gcloud secrets versions list <SEGREDO> --project=$PROJECT"
echo "       gcloud secrets versions disable <VERSAO> --secret=<SEGREDO> --project=$PROJECT"
echo "========================================"
