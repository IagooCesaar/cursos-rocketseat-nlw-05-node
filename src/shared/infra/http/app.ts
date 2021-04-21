import "express-async-errors";
import "reflect-metadata";
import "@shared/container";

import express, { Request, Response } from "express";

import createConnection from "@shared/infra/typeorm";

import { handlingErrors } from "./middlewares/HandlingErrors";
import { router } from "./routes";

createConnection();

const app = express();
app.use(express.json());

app.use(router);

app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello NLW#05 🚀" });
});

app.use(handlingErrors);

export { app };
