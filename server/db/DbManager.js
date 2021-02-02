const mongodb = require('mongodb');

const DbManager = {};

DbManager.connect = async function() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.95ult.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    console.log(uri);
    return mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

DbManager.getCollection = async function(collection) {
    const connection = await DbManager.connect();
    return connection.db(process.env.DB_NAME).collection(collection);
}

module.exports = DbManager;
