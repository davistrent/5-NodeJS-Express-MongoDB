const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

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

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, (err, result) => {
            assert.strictEqual(err, null);

            console.log('Insert Document: ', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);

                console.log('Found documents: ', docs);

                client.close();
            });
        });
    });
});
