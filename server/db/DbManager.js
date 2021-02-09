const MongoClient = require('mongodb').MongoClient;

class DbManager {
    constructor(cluster, database, user, password) {
        this.cluster = cluster;
        this.database = database;
        this.user = user;
        this.password = password;
        this.url = `mongodb+srv://${this.user}:${this.password}@${this.cluster}.95ult.mongodb.net/${this.database}?retryWrites=true&w=majority`;
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = Object.freeze(new DbManager(
                process.env.DB_CLUSTER,
                process.env.DB_NAME,
                process.env.DB_USER,
                process.env.DB_PASSWORD
            ));
        }
        return this.instance;
    }

    async getCollection(collection) {
        const client = new MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const connection = await client.connect();
        return connection.db(this.database).collection(collection);
    }

    async getProjectsCollection() {
        return this.getCollection('projects');
    }

    async getTechnologiesCollection() {
        return this.getCollection('technologies');
    }
}

module.exports = DbManager;
