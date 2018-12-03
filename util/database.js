const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://huguenot412:yifuV5q7WvY4HnQ1@snowstorm-7yer5.mongodb.net/planner?retryWrites=true')
        .then(client => {
            console.log('Connected to database');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
