const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const dboper = require('./operations');

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";
const collectionName = 'campsites';

assert.strictEqual(null, null);

MongoClient.connect(url, {
    useUnifiedTopology: true,
}, (err, client) => {
    
    assert.strictEqual(err, null);

    console.log('Successfully connected to Mongo Client.');

    const db = client.db(dbname);

    db.dropCollection(collectionName, (err, result) => {
        assert.strictEqual(err, null);
        console.log(`Dropped collection ${collectionName}`, result);
    
        const collection = db.collection(collectionName);

        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, collectionName, result => {
            console.log('Insert Document: ', result.ops);

            dboper.findDocuments(db, collectionName, docs => {
                console.log('Found documents: ', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground"}, {description: "Updated test description"}, collectionName, result => {
                    console.log('Updated document count: ', result.result.nModified);

                    dboper.findDocuments(db, collectionName, docs => {
                        console.log('Found documents: ', docs);

                        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, collectionName, result => {
                            console.log('Deleted document count: ', result.deletedCount);

                            client.close();
                        });
                    });
                });
            });
        });
    });
});
