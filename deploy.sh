git checkout deployment

git merge master

cd frontend
npm run build
cd ..

git add .
git commit -m "Deploy"
git push

git checkout master
