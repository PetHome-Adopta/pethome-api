import { Databases } from './databases/databases';
import { infrastructure } from '../entities/infrastructure';
import { JWTInfrastructure } from './JWT';


export class Infrastructure {

    private infrastructure:infrastructure;

    async initInfrastructure() {
        try {
            console.log("Initializing Infrastructure...");

            const databases = new Databases();

            await databases.initDatabases();

            this.infrastructure = {
                databases: databases,
                jwt: new JWTInfrastructure()
            }
            console.log("Initialized Infrastructure.")
        }catch(e) {
            console.log("Error initializing infrastructure");
            console.log(e);
        }
    }

    getInfrastructure() {
        return this.infrastructure;
    }

}