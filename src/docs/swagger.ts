import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { Express } from "express";

const setupSwagger = (App: Express) => {
  App.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
