#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "========================================"
echo "  Cloud Functions Deployment Script"
echo "========================================"
echo "Project: ${GCP_PROJECT:-corresocialapp}"
echo ""
# Secrets come from Secret Manager (--set-secrets in each package.json).
# Create/rotate them first with: bash setup_secrets.sh
echo "Secrets are read from Secret Manager. Run 'bash setup_secrets.sh' first if they are not created/rotated yet."
echo ""

# Step 1: Install dependencies
echo "Step 1/2: Installing dependencies..."
bash "$SCRIPT_DIR/install_all_deps.sh"
echo ""

# Step 2: Deploy all functions
echo "Step 2/2: Deploying functions..."
echo ""

DEPLOY_COMMAND="npm run deploy"

for dir in */; do
  if [ -f "$dir/package.json" ]; then
    echo "Deploying function in $dir..."
    (cd "$dir" && $DEPLOY_COMMAND)
  fi
done

echo ""
echo "========================================"
echo "All functions have been deployed."
echo "========================================"
