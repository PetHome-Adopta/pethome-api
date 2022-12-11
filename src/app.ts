import express, { Express } from "express";
import { Controllers } from "./controllers";
import { Helpers } from "./helpers";
import { Infrastructure } from "./infrastructure";
import { Services } from "./services";

// Init env
require('dotenv').config();

const App: Express = express();

export let infrastructure;
export let services;
export let helpers;

(async () => {

    // Init infrastructure and globalize it
    infrastructure = (new Infrastructure()).getInfrastructure();

    // Init controllers
    new Controllers(App);

    // Init services and globalize it
    services = (new Services()).getServices();

    // Init helpers and globalize it
    helpers = (new Helpers(infrastructure.databases)).getHelpers();

    App.listen(process.env.LISTEN_PORT);

    console.log(`Listening port ${process.env.LISTEN_PORT}`);

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