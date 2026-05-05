#!/usr/bin/env bash
# Provision Azure Static Web Apps resource + resource group for P4-T1.
# Prereqs: Azure CLI (`az`), WSL — run after `az login` and `az account set`.
#
# Defaults match /ai/DEPLOYMENT.md. Override with env vars:
#   AZURE_SUBSCRIPTION_ID  AZURE_RG  AZURE_SWA_NAME  AZURE_LOCATION
#
# This script does NOT configure GitHub OIDC, secrets, or custom domains
# (P4-T2+). It prints the default *.azurestaticapps.net hostname for smoke tests.

set -euo pipefail

SUBSCRIPTION="${AZURE_SUBSCRIPTION_ID:-}"
RG="${AZURE_RG:-rg-devildogcyber-prod}"
SWA_NAME="${AZURE_SWA_NAME:-swa-devildogcyber-prod}"
LOCATION="${AZURE_LOCATION:-southcentralus}"

if ! command -v az >/dev/null 2>&1; then
  echo "error: Azure CLI ('az') not found. Install: https://learn.microsoft.com/cli/azure/install-azure-cli" >&2
  exit 127
fi

if [[ -n "$SUBSCRIPTION" ]]; then
  az account set --subscription "$SUBSCRIPTION"
fi

echo "Using subscription: $(az account show --query name -o tsv) ($(az account show --query id -o tsv))"
echo "Resource group: $RG  |  SWA: $SWA_NAME  |  Location: $LOCATION"
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
  echo "Creating Static Web App (Free tier, no GitHub source — deploy via Actions in P4-T2)..."
  az staticwebapp create \
    --name "$SWA_NAME" \
    --resource-group "$RG" \
    --location "$LOCATION" \
    --sku Free
fi

echo
HOSTNAME="$(az staticwebapp show --name "$SWA_NAME" --resource-group "$RG" --query defaultHostname -o tsv)"
echo "Default hostname: https://${HOSTNAME}"
echo
echo "Next (human):"
echo "  - Azure Portal → SWA → Custom domains — when ready (apex/www cutover is P4-T6; validation DNS is often Cloudflare)."
echo "  - P4-T2: GitHub OIDC + deploy workflow; deployment token if required by the SWA action (see DEPLOYMENT.md)."
