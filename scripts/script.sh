###
 # @Author: indeex
 # @Date: 2021-07-28 20:36:14
 # @Email: indeex@qq.com
### 
set -e
branch=$CI_COMMIT_REF_NAME
if [ "$branch" = "master" ]; then
    env=prd
else
    echo "[CI] Current branch is invaild"
fi
search_dir=apps
counter=0
for path in "$search_dir"/*; do
    if [ $(git diff HEAD~ --name-only | grep "$path") ]; then
        page_name=$(basename $path)
        echo "[CI] Page \"$page_name\" has been modified"
        echo "[CI] Start building"
        npm run build $page_name $env
        counter=$((counter + 1))
    fi
done
if [ "$counter" -eq "0" ]; then
    echo "[CI] No page has been modifed"
    echo "[CI] Skip Building"
fi