#!/bin/bash

# Usage: version-packages.sh
# Example: version-packages.sh

# Get the list of changed packages using Lerna
CHANGED_PACKAGES=$(yarn lerna changed --json | jq -r '.[].name')

if [ -n "$CHANGED_PACKAGES" ]; then
  echo "Changed packages detected: $CHANGED_PACKAGES"
  yarn lerna version --no-private --conventional-commits --conventional-prerelease --include-merged-tags --no-git-tag-version

  # Stage changes to package.json files
  for PACKAGE_NAME in $CHANGED_PACKAGES; do
    grep -q "\"name\": \"$PACKAGE_NAME\"" packages/$PACKAGE_NAME/package.json && git add packages/$PACKAGE_NAME/package.json
  done
else
  echo "No changed packages detected. Skipping lerna version."
fi
