#!/bin/bash
rm -rf ./admin
# Copy files from ../backend/dist/build to current working directory
cp -r ./backend/dist/build/* ./admin
# Add all files to git staging area
git add .
# Commit with a message
git commit -m "update admin part."
# Push to main branch
git push origin main
