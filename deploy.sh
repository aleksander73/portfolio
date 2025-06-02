git checkout deployment

git merge master

cd frontend
npm run build
cd ..

git add .
git commit -m "Deploy"
giit push

git checkout master
