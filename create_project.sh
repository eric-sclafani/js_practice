mkdir $1 

cd todoApp
cp -r node_modules package-lock.json package.json tsconfig.json ../$1

cd ../$1
touch README.md && echo "# Project" > README.md
mkdir src
cd src
touch index.ts index.html style.css