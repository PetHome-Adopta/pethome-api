import express, { Express } from "express";
import { Controllers } from "./controllers";
import { Services } from "./services";

const App: Express = express();

new Controllers(App);
export const services = (new Services()).getServices();

App.listen(8080);



/*
3 - express
2 - bbdd
1.5 - controller
1 - middleware 
0 - service
-1 - helper
*/