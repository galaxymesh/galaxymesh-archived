#!/bin/bash

# Usage: version-packages.sh <changed_packages>
# Example: version-packages.sh package1,package2,package3

CHANGED_PACKAGES=$1

if [ -n "$CHANGED_PACKAGES" ]; then
  echo "Changed packages detected: $CHANGED_PACKAGES"
  IFS=', ' read -r -a PACKAGES <<< "$CHANGED_PACKAGES"
  for PACKAGE_NAME in "${PACKAGES[@]}"; do
    yarn lerna version --no-private --conventional-commits --conventional-prerelease --include-merged-tags --no-git-tag-version "$PACKAGE_NAME"
    grep -q "\"name\": \"$PACKAGE_NAME\"" packages/$PACKAGE_NAME/package.json && git add packages/$PACKAGE_NAME/package.json
  done
else
  echo "No changed packages detected. Skipping lerna version."
fi

# Extract package names from modified package.json files
MODIFIED_PACKAGES=$(git diff --name-only | grep 'packages/.*/package.json' | sed 's/packages\/\(.*\)\/package.json/\1/')
for PACKAGE_NAME in $MODIFIED_PACKAGES; do
  git add packages/$PACKAGE_NAME/package.json
done
