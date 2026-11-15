#!/bin/bash
# This script installs npm dependencies in each subdirectory that contains a package.json file.

for dir in */; do
  if [ -f "$dir/package.json" ]; then
    echo "Installing dependencies in $dir..."
    (cd "$dir" && npm install)
  fi
done

echo "All dependencies have been installed."
