#!/bin/bash

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================"
echo "  Cloud Functions Deployment Script"
echo "========================================"
echo ""

# Step 1: Generate .env.yaml files
echo "Step 1/3: Generating .env.yaml files..."
bash "$SCRIPT_DIR/config_all.sh"
echo ""

# Step 2: Install dependencies
echo "Step 2/3: Installing dependencies..."
bash "$SCRIPT_DIR/install_all_deps.sh"
echo ""

# Step 3: Deploy all functions
echo "Step 3/3: Deploying functions..."
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
