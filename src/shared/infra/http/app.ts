import "express-async-errors";
import "reflect-metadata";
import "@shared/container";

import express, { Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import { router } from "./routes";

createConnection();

const app = express();
app.use(express.json());

app.use(router);

app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello NLW#05 🚀" });
});

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error: \n${err.message}`,
  });
});

export { app };
