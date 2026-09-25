// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

// instance of express and define constant for listening port
const app = express();
const port = 8000;

// CORS allows backend to respond to calls coming from anywhere
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*
app.get("/", (req, res) => {
  res.send("Hello World!");
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
*/

// GET /users/:name
// Filters the list, when we go to the port: http://localhost:8000/users?name=Mac
// The ?name=Mac is our argument passed to the .get req. The response is the returned result.
// .filter returns a whole new array containing the matching elements
/*
const findUserByName = (name) => {
  return findUserByName(name)
  //users["users_list"].filter((user) => user["name"] === name);
};
*/

// First API endpoint, endpoint accepts http GET requests
// req is requesting the data, res is the response
// In the function we use those objects to process the request 
// and send a response to the client that called the REST API
app.get("/users", async (req, res, next) => {
  try {
    const users = await userService.getUsers(
      req.query.name,
      req.query.job
    );

    res.json({ users_list: users});
  } catch (error) {
    next(error);
  }
  /*
  Old Code
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = {users_list: result};
    res.send(result);
  }
  else {
    res.send(users);
  }
    */
});

// GET /users/:id
// Finds user by id. Endpoint accepts http GET requests, pass users to req and the response is 
// :id is a variable, assign id to a passed variable, loop through the array to find its user AND check if user id matches :id
// response is either an error or returned user matching the id, .find returns first matching element
// Test Link: http://localhost:8000/users/zap555
/*
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
*/

app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).send("Resource not found.");
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
 
  /*
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
  return res.send(findUserById)
    */
});


// POST /users/addUser
// req.body ais key valUE PAIRS OF DATA SUBMITTED in REQUEST BODY 
// use the below json body in boomerang in a POST 
/*
{
  "id": "qwe123",
  "job": "Zookeeper",
  "name": "Cindy"
}
*/ 
/*
const addUser = (user) => {
  const randNum = Math.random();
  const base36String = randNum.toString(36).slice(2);
  const userToPush = {
    id: base36String, 
    name: user.name, 
    job: user.job,
  };
  users["users_list"].push(userToPush);
  return userToPush;
};
*/


app.post("/users", async (req, res, next) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
  /*
  Old Code
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).send(addedUser);
  */
});



// DELETE /users/deleteUser
// Add first the user then try to delete it by passing the id
/*
{
  "id": "qwe123",
}
*/ 
/*
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
*/

app.delete("/users/:id", async (req, res, next) => {
  try {
    const deletedUser = await userService.removeUser(req.params.id);

    if (!deletedUser) {
      return res.status(400).send({error: "Invalid User Id"});
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
  //const userToDelete = req.body;

  //if (!userToDelete || !userToDelete.id) {
  //  return res.status(400).send({error: "Missing user ID in request body"});
  //}

  // Get the id parameter, before deleting from frontend check for success on backend
  /*
  Old Code
  const removedUser = deleteUser(req.params.id);

  if (!removedUser){
    return res.status(404).send({error: "user not found"});
  }

  res.status(204).send();
  */

// GET users that match a given name and a job
// Test Link: http://localhost:8000/users?name=Cindy&job=Zookeeper
/*
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => user["name"] === name && user["job"] === job) ;
};
*/

/*
Old Code
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
*/
app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "Internal server error" });
});

// start of IE3: Linking Frontend to Backend

