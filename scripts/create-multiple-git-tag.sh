#!/bin/bash

yarn lerna ls --json --all | jq -r '.[].location' | while read -r dir; do
  VERSION=$(node -e "console.log(require('$dir/package.json').version)")
  NAME=$(node -e "console.log(require('$dir/package.json').name)")
  TAG="$NAME@v$VERSION"
  git tag -a "$TAG" -m "Version $VERSION"
  echo "Git tag $TAG created"
done

git push --tags
