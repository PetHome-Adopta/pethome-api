import { Databases } from './databases/databases';
import { infrastructure } from '../entities/infrastructure';
import { JWTInfrastructure } from './JWT';


export class Infrastructure {

    private infrastructure:infrastructure;

    constructor() {
        (async () => {
            console.log("Initializing Infrastructure...");
            this.infrastructure = {
                databases: new Databases(),
                jwt: new JWTInfrastructure()
            }
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