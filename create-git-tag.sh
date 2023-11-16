#!/bin/bash

# Extract version from package.json file
VERSION=$(node -e "console.log(require('./packages/galaxymesh-base/package.json').version)")

# Extract package name from the package.json file
NAME=$(node -e "console.log(require('./packages/galaxymesh-base/package.json').name)")

# Create a Git tag with the v prefix
TAG="$NAME@v$VERSION"
git tag -a "$TAG" -m "Version $VERSION"

echo "Git tag $TAG created"
