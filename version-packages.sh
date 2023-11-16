#!/bin/bash

# Usage: version-packages.sh
# Example: version-packages.sh

# Get the list of changed packages using Lerna
CHANGED_PACKAGES=$(yarn lerna changed --json | jq -r '.[].name')

if [ -n "$CHANGED_PACKAGES" ]; then
  echo "Changed packages detected: $CHANGED_PACKAGES"
  yarn lerna version --no-private --conventional-commits --conventional-prerelease --include-merged-tags --no-git-tag-version --yes
else
  echo "No changed packages detected. Skipping lerna version."
fi
