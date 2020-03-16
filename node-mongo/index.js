const MongoClient = require('mongodb').MongoClient;

const dboper = require('./operations');

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";
const collectionName = 'campsites';


MongoClient.connect(url, {
    useUnifiedTopology: true,
}
).then(client => {
    console.log('Successfully connected to Mongo Client.');

    const db = client.db(dbname);

    db.dropCollection(collectionName)
    .then(result => {
        console.log(`Dropped collection ${collectionName}`, result);
    
        return dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, collectionName);
    })
    .then(result => {
        console.log('Insert Document: ', result.ops);
            return dboper.findDocuments(db, collectionName);
    })
    .then(docs => {
        console.log('Found documents: ', docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground"}, {description: "Updated test description"}, collectionName);
    })
    .then(result => {
        console.log('Updated document count: ', result.result.nModified);

        return dboper.findDocuments(db, collectionName);
    })
    .then(docs => {
        console.log('Found documents: ', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, collectionName);
    })
    .then(result => {
        console.log('Deleted document count: ', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
}).catch(err => console.log(err));
