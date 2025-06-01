const EnvironmentManager = require('../environment/EnvironmentManager');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

class Database {
    constructor(connectionParams) {
        this.dbName = connectionParams?.dbName;
        this.url = this.constructUrl(connectionParams);
    }

    static getInstance() {
        if(!this.instance) {
            // Gather connection parameters depending on environment
            let connectionParams = {};
            if(EnvironmentManager.isDevelopment()) {
                const { DB_NAME } = process.env;
                connectionParams = {
                    dbName: DB_NAME
                };
            } else if(EnvironmentManager.isProduction()) {
                const { DB_CLUSTER_NAME, DB_CLUSTER_ID, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
                connectionParams = {
                    clusterName: DB_CLUSTER_NAME,
                    clusterID: DB_CLUSTER_ID,
                    dbName: DB_NAME,
                    user: DB_USER,
                    password: DB_PASSWORD
                };
            }

            this.instance = Object.freeze(new Database(connectionParams));
        }
        return this.instance;
    }   

    constructUrl(connectionParams) {
        let url = '';
        if(EnvironmentManager.isDevelopment()) {
            const { dbName } = connectionParams;
            url = `mongodb://localhost:27017/${dbName}`;
        } else if(EnvironmentManager.isProduction()) {
            const { clusterName, clusterID, dbName, user, password } = connectionParams;
            url = `mongodb+srv://${user}:${password}@${clusterName}.${clusterID}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        }
        return url;
    }
    
    // ==================================================

    async getConnection() {
        const client = new MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return client.connect();
    }

    async loadCollection(collection) {
        const connection = await this.getConnection();
        return connection.db(this.dbName).collection(collection);
    }

    async getCollection(collectionName, filter) {
        const collection = await this.loadCollection(collectionName);
        return collection.find(filter || {}).toArray();
    }

    async postDocument(collectionName, document) {
        const collection = await this.loadCollection(collectionName);
        return collection.insertOne(document);
    }

    async updateDocument(collectionName, _id, values) {
        const collection = await this.loadCollection(collectionName);
        return collection.updateOne({ _id: ObjectId(_id) }, {
            $set: values
        });
    }
}

module.exports = Database;
