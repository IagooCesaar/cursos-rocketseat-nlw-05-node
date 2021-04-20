import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello NLW#05 🚀" });
});

export { app };
