import "express-async-errors";
import "reflect-metadata";
import "@shared/container";

import express, { Request, Response } from "express";

import createConnection from "@shared/infra/typeorm";

createConnection();

const app = express();
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello NLW#05 🚀" });
});

export { app };
