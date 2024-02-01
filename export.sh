mkdir temp
cp ./docs/CNAME ./temp/CNAME
cp ./docs/.nojekyll ./temp/.nojekyll
cp ./docs/robots.txt ./temp/robots.txt
npm run fmt
npm run build
rm -rf ./docs
cp -rf ./out ./docs
cp ./temp/CNAME ./docs/CNAME
cp ./temp/.nojekyll ./docs/.nojekyll
cp ./temp/robots.txt ./docs/robots.txt
rm -rf ./temp
