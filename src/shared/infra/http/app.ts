import "express-async-errors";

import "@shared/container";

import express, { Request, Response } from "express";
import path from "path";

import createConnection from "@shared/infra/typeorm";

import { handlingErrors } from "./middlewares/HandlingErrors";
import { router } from "./routes";

createConnection();

const app = express();

app.use(
  express.static(path.resolve(__dirname, "..", "..", "..", "..", "public"))
);
app.set("views", path.resolve(__dirname, "..", "..", "..", "..", "public"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

app.get("/pages/client", (request: Request, response: Response) => {
  return response.render("html/client.html");
});

app.get("/pages/admin", (request: Request, response: Response) => {
  return response.render("html/admin.html");
});

app.use(
  "/api-coverage",
  express.static(
    path.resolve(__dirname, "..", "..", "..", "..", "coverage", "lcov-report")
  )
);
app.get("/api-coverage", (request: Request, response: Response) => {
  return response.sendFile(
    path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "coverage",
      "lcov-report",
      "index.html"
    )
  );
});

app.use(express.json());

app.use(router);

app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello NLW#05 🚀" });
});

app.use(handlingErrors);

export { app };
