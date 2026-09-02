// backend.js
import express from "express";

// instance of express and define constant for listening port
const app = express();
const port = 8000;

app.use(express.json());

// First API endpoint, endpoint accepts http GET requests
// req is requesting the data, res is the response
// In the function we use those objects to process the request 
// and send a response to the client that called the REST API
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});