import express, { Express } from "express";
import { Controllers } from "./controllers/index";
import { Helpers } from "./helpers/index";
import { Infrastructure } from "./infrastructure";
import { Services } from "./services/index"
import { Deserializer } from "./middlewares/deserializer";
import { services as S } from "./entities/services";
import { helpers as H } from "./entities/helpers";
import { infrastructure as I } from "./entities/infrastructure";
import { Authorized } from "./middlewares/authorized";
import swaggerDocs from "./utils/swagger";

// Init env
require('dotenv').config();

export let infrastructure: I;
export let services: S;
export let helpers: H;

export default (async () => {

    const App: Express = express();
    // Init middlewares
 
    App.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Origin, Accept, X-Requested-With");
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
        next();
    });

    App.use(Deserializer);

    App.use("*/admin/*", Authorized);

    // Init infrastructure and globalize it
    const toInitInfra = new Infrastructure() as any;
    await toInitInfra.initInfrastructure();
    infrastructure = toInitInfra.getInfrastructure();

    // Init controllers
    new Controllers(App);

    // Init services and globalize it
    services = (new Services()).getServices();

    // Init helpers and globalize it
    helpers = (new Helpers(infrastructure.databases)).getHelpers();

    //Init swagger 
    swaggerDocs(App, Number(process.env.LISTEN_PORT));

    console.log(`Listening port ${process.env.LISTEN_PORT}`);

    App.listen(process.env.LISTEN_PORT).on("error", () => {
        console.log("Application in test mode");
    })

})().catch((e) => {
    console.log(e);
})



/*
3 - express
2 - bbdd
1.5 - controller
1 - middleware 
0 - service
-1 - helper
*/