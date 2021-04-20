import express from 'express'

const app = express()
app.use(express.json())

app.get("/", (request, response) => {
  return response.status(200).json({message: "Hello NLW#05"})
})

export { app }