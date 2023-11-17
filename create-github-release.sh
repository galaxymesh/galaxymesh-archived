#!/bin/bash

# Usage: create-github-release.sh
# Example: create-github-release.sh

TAGS=($(git tag -l --sort=-version:refname))

for TAG in "${TAGS[@]}"; do
  PACKAGE_NAME=$(grep -oP '(?<=name": ").*?(?=",)' packages/${TAG//\@/\/}/package.json)
  gh release create $TAG ./packages/$PACKAGE_NAME -t "$TAG" --yes
done
