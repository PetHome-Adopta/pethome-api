import {MongoClient, Db} from 'mongodb';


export class MongoDB {

    async startDB(){
        const result = await MongoClient.connect(`mongodb://${process.env.MONGO_USERNAME != null ? encodeURIComponent(process.env.MONGO_USERNAME) : ""}${process.env.MONGO_PASSWORD != null ? encodeURIComponent(process.env.MONGO_PASSWORD) + ":" : ""}${process.env.MONGO_USERNAME != null || process.env.MONGO_PASSWORD != null ? "@" : ""}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,{
            authSource: 'admin', 
            retryWrites: false,
            promoteLongs: false
        });

        return result.db(process.env.MONGO_DATABASE) as Db;
    }

    

}