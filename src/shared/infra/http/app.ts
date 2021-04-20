import express from "express";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Hello NLW#05" })
});

export { app };
