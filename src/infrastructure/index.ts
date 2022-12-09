import { Databases } from './databases/databases';
import { infrastructure } from '../entities/infrastructure';


export class Infrastructure {

    private infrastructure:infrastructure = {
        databases: null
    }

    constructor() {
        (async () => {
            console.log("Initializing Infrastructure...");
            this.infrastructure.databases = new Databases();
            console.log("Initialized Infrastructure.")
        })().catch((e) => {
            console.log("Error initializing infrastructure");
            console.log(e);
        });
    }

    getInfrastructure() {
        return this.infrastructure;
    }

}