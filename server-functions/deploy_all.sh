DEPLOY_COMMAND="npm run deploy"

for dir in */; do
  if [ -f "$dir/package.json" ]; then
    echo "Deploying function in $dir..."
    (cd "$dir" && $DEPLOY_COMMAND)
  fi
done

echo "All functions have been deployed."
