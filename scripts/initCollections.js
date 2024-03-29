
const mongo = require("mongodb");

require("dotenv").config();

(async () => {

const connection = await mongo.MongoClient.connect(`mongodb://${process.env.MONGO_USERNAME != null ? encodeURIComponent(process.env.MONGO_USERNAME) + ":" : ""}${process.env.MONGO_PASSWORD != null ? encodeURIComponent(process.env.MONGO_PASSWORD) : ""}${process.env.MONGO_USERNAME != null || process.env.MONGO_PASSWORD != null ? "@" : ""}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,{
            authSource: 'admin', 
            retryWrites: false,
            promoteLongs: false
        });

        const db = await connection.db(process.env.MONGO_DATABASE);

        // Create all the collections

        db.createCollection("pets");
        console.log("Pets collection created successfully");
        db.createCollection("petsTypes");
        console.log("PetsTypes collection created successfully");
        db.createCollection("shelters");
        console.log("Shelters collection created successfully");

        return process.exit(1);

    })().catch((e) => {
        console.log(e);
        return;
    })