# Portfolio
Portfolio single page application

## Setting up the environment
* Create `.env` file in the project `root` and provide your `development MongoDB database` credentials. You should use the following file structure
```
DB_CLUSTER = ?
DB_NAME = ?
DB_USER = ?
DB_PASSWORD = ?
```
* Since I have a lot of references to `client/assets` folder, you will have to find them and resolve the missing assets problems

## Build
* Run `npm install` from `root` as well as from front-end project `/client`
* Run `npm run build `from front-end project `/client`

## Run
* Run `npm run dev` from `root` to start the backend server
* Run `npm run serve` from `/client` folder to start development server
* Application should now be accessible from the browser at `http://localhost:8080`
