// backend.js
import express from "express";

// instance of express and define constant for listening port
const app = express();
const port = 8000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

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

// GET /users/:name
// Filters the list, when we go to the port: http://localhost:8000/users?name=Mac
// The ?name=Mac is our argument passed to the .get req. The response is the returned result.
// .filter returns a whole new array containing the matching elements
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

// GET /users/:id
// Finds user by id. Endpoint accepts http GET requests, pass users to req and the response is 
// :id is a variable, assign id to a passed variable, loop through the array to find its user AND check if user id matches :id
// response is either an error or returned user matching the id, .find returns first matching element
// EX: http://localhost:8000/users/zap555
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


// POST /users/addUser
// req.body ais key valUE PAIRS OF DATA SUBMITTED in REQUEST BODY 
/*
{
  "id": "qwe123",
  "job": "Zookeeper",
  "name": "Cindy"
}
*/ 
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// DELETE /users/deleteUser
// Add first the user then try to delete it
/*
{
  "id": "qwe123",
  "job": "Zookeeper",
  "name": "Cindy"
}
*/ 
const deleteUser = (user) => {
  const list = users["users_list"];

  // Find the position (index) of the user with the matching ID
  const index = list.findIndex(u => u.id === user);

  // Do this to prevent empty gaps
  if (index !== -1) {
    // Cut 1 item out of the array at that specific index
    const deletedUser = list.splice(index, 1)[0];
    return deletedUser; 
  }

  return null; // return null if not found
};

app.delete("/users", (req, res) => {
  const userToDelete = req.body;

  if (!userToDelete || !userToDelete.id) {
    return res.status(400).send({error: "Missing user ID in request body"});
  }

  const removedUser = deleteUser(userToDelete.id);

  if (!removedUser){
    return res.status(404).send({error: "user not found"});
  }

  res.send(removedUser);
});

// GET users that match a given name and a job
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => user["name"] === name && user["job"] === job) ;
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});
