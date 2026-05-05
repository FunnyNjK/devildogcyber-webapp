#!/usr/bin/env bash
# Provision Azure Static Web Apps resource + resource group for P4-T1.
# Prereqs: Azure CLI (`az`), WSL — run after `az login` and `az account set`.
#
# Defaults match /ai/DEPLOYMENT.md (Standard tier, Central US, devil-web-rg).
# Override with env vars:
#   AZURE_SUBSCRIPTION_ID  AZURE_RG  AZURE_SWA_NAME  AZURE_LOCATION  AZURE_SKU
#
# This script does not configure GitHub secrets or custom domains (P4-T2+).
# It prints the default *.azurestaticapps.net hostname for smoke tests.

set -euo pipefail

SUBSCRIPTION="${AZURE_SUBSCRIPTION_ID:-}"
RG="${AZURE_RG:-devil-web-rg}"
SWA_NAME="${AZURE_SWA_NAME:-devildogcyber}"
LOCATION="${AZURE_LOCATION:-centralus}"
SKU="${AZURE_SKU:-Standard}"

if ! command -v az >/dev/null 2>&1; then
  echo "error: Azure CLI ('az') not found. Install: https://learn.microsoft.com/cli/azure/install-azure-cli" >&2
  exit 127
fi

if [[ -n "$SUBSCRIPTION" ]]; then
  az account set --subscription "$SUBSCRIPTION"
fi

echo "Using subscription: $(az account show --query name -o tsv) ($(az account show --query id -o tsv))"
echo "Resource group: $RG  |  SWA: $SWA_NAME  |  Location: $LOCATION  |  SKU: $SKU"
echo

if ! az group show --name "$RG" >/dev/null 2>&1; then
  echo "Creating resource group..."
  az group create --name "$RG" --location "$LOCATION"
else
  echo "Resource group already exists: $RG"
fi

if az staticwebapp show --name "$SWA_NAME" --resource-group "$RG" >/dev/null 2>&1; then
  echo "Static Web App already exists: $SWA_NAME"
else
  echo "Creating Static Web App (${SKU} tier, no GitHub source — deploy via GitHub Actions)..."
  az staticwebapp create \
    --name "$SWA_NAME" \
    --resource-group "$RG" \
    --location "$LOCATION" \
    --sku "$SKU"
fi

echo
HOSTNAME="$(az staticwebapp show --name "$SWA_NAME" --resource-group "$RG" --query defaultHostname -o tsv)"
echo "Default hostname: https://${HOSTNAME}"
echo
echo "Next (human):"
echo "  1. Azure Portal → SWA → Manage deployment token → add repo secret AZURE_STATIC_WEB_APPS_API_TOKEN (see /ai/DEPLOYMENT.md)."
echo "  2. SWA → Configuration → set Node 24 for Functions if prompted (ADR-018)."
echo "  3. Custom domains: add records at your DNS host (GoDaddy) per Portal when ready."
