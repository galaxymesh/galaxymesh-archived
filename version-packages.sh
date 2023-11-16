#!/bin/bash

# Usage: version-packages.sh
# Example: version-packages.sh

# Get the list of changed packages using Git history
CHANGED_PACKAGES=$(git diff --name-only HEAD~1 HEAD | grep 'packages/.*/package.json' | sed 's/packages\/\(.*\)\/package.json/\1/')

if [ -n "$CHANGED_PACKAGES" ]; then
  echo "Changed packages detected: $CHANGED_PACKAGES"
  IFS=', ' read -r -a PACKAGES <<< "$CHANGED_PACKAGES"
  for PACKAGE_NAME in "${PACKAGES[@]}"; do
    echo "Versioning package: $PACKAGE_NAME"
    yarn lerna version --no-private --conventional-commits --conventional-prerelease --include-merged-tags --no-git-tag-version
    grep -q "\"name\": \"$PACKAGE_NAME\"" packages/$PACKAGE_NAME/package.json && git add packages/$PACKAGE_NAME/package.json
  done
else
  echo "No changed packages detected. Skipping lerna version."
fi
