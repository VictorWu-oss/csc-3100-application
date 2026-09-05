// backend.js
import express from "express";

// instance of express and define constant for listening port
const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

// Filters the list, when we go to the port: http://localhost:8000/users?name=Mac
// The ?name=Mac is our argument passed to the .get req. The response is the returned result.
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// First API endpoint, endpoint accepts http GET requests
// req is requesting the data, res is the response
// In the function we use those objects to process the request 
// and send a response to the client that called the REST API
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = {users_list: result};
    res.send(result);
  }
  else {
    res.send(users);
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});