#!/usr/bin/env bash

# Auto-commit files and push tags
git add .
git commit -m "chore(release): clean up changelogs"
git push origin main
git push --tags