import express, { Express } from "express";
import { Controllers } from "./controllers/index";
import { Helpers } from "./helpers/index";
import { Infrastructure } from "./infrastructure";
import { Services } from "./services/index"
import { Deserializer } from "./middlewares/deserializer";
import { services as S } from "./entities/services";
import { helpers as H } from "./entities/helpers";
import { infrastructure as I } from "./entities/infrastructure"

// Init env
require('dotenv').config();

export let infrastructure: I;
export let services: S;
export let helpers: H;

export default (async () => {

    const App: Express = express();
    // Init middlewares

    App.use(Deserializer);

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

    console.log(`Listening port ${process.env.LISTEN_PORT}`);

    App.listen(process.env.LISTEN_PORT);




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