# Portfolio
Portfolio single page application

## Setting up the environment
* Create `.env` file in the project `root` and provide your `development MongoDB database` credentials. You should use the following file structure
```
DB_CLUSTER_NAME = ?
DB_CLUSTER_ID = ?
DB_NAME = ?
DB_USER = ?
DB_PASSWORD = ?
JWT_SECRET = ?
```
* Since I have a lot of references to `frontend/assets` folder, you will have to find them and resolve the missing assets problems

## Build
* Run `npm install` from `root` as well as from front-end project `/frontend`
* Run `npm run build `from front-end project `/frontend`

## Run
* Run `npm run dev` from `root` to start the backend server
* Run `npm run serve` from `/frontend` folder to start development server
* Application should now be accessible from the browser at `http://localhost:8080`
