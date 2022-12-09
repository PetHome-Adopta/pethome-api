import express, { Express } from "express";
import { Controllers } from "./controllers";
import { Infrastructure } from "./infrastructure";
import { Services } from "./services";

// Init env
require('dotenv').config();

const App: Express = express();

// Init infrastructure and globalize it
export let infrastructure = (new Infrastructure()).getInfrastructure();

// Init controllers
new Controllers(App);

// Init services and globalize it
export const services = (new Services()).getServices();

App.listen(process.env.LISTEN_PORT);

console.log(`Listening port ${process.env.LISTEN_PORT}`);



/*
3 - express
2 - bbdd
1.5 - controller
1 - middleware 
0 - service
-1 - helper
*/