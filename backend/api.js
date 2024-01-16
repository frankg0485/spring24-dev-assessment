import express from 'express';
import { database } from './database.js';
import cors from "cors";

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/bog/users', (req, res) => {
    res.json(database).status(200);
});


app.get('/api/bog/users/:id', (req, res) => {
    const user = database.filter((user) => user.id === req.params.id)[0]
    res.json(user).status(200)
});

// add new user
app.post('/api/bog/users', (req, res) => {
  database.push(req.body);
  res.json().status(200);
});

// edit user by id
app.post('/api/bog/users/:id', (req, res) => {
  const index = database.findIndex((user) => user.id === req.params.id)

  if (index !== -1) {
    database[index] = req.body;
    res.json().status(200);
  } else {
    res.json().status(404);
  }
});

// delete user by id
app.delete('/api/bog/users/:id', (req, res) => {
  const index = database.findIndex((user) => user.id === req.params.id);
  if (index !== -1) {
    database.splice(index, 1);
    res.json().status(200);
  } else {
    res.json().status(404);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
