import { Db } from 'mongodb';
import { MongoDB } from './mongodb';
import { databases } from '../../../entities/infrastructure';


export class Databases {

    private clients: databases = {
        mongo: null,
    }

    constructor() {
        (async () => {

            console.log("Initializing Databases...");
            this.clients.mongo = (await new MongoDB().startDB()) as Db;
            console.log("Initialized databases.")
        })().catch((e) => {
            console.log("Error initializing databases");
            console.log(e);
        });
        
    }

    getClients() {
        return this.clients;
    }

}