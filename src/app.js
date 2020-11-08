const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  repository = {title, url, techs, id: uuid(), likes: 0};
  repositories.push(repository);
  return response.status(201).send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositoryIndex < 0){
    return response.status(400).send({error: "Repository not found."});
  }

  const repository = repositories[repositoryIndex];

  const {title, url, techs} = request.body;

  updatedRepository = {
    title: title ? title : repository.title,
    url: url ? url : repository.url,
    techs: techs ? techs : repository.techs,
    likes: repository.likes,
    id
  }

  repositories[repositoryIndex] = updatedRepository;
  return response.send(updatedRepository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositoryIndex < 0){
    return response.status(400).send({error: "Repository not found."});
  }

  repositories.splice(repositoryIndex,1);
  return response.status(204).send()
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositoryIndex < 0){
    return response.status(400).send({error: "Repository not found."});
  }
  repositories[repositoryIndex].likes++;
  response.send(repositories[repositoryIndex]);
});

module.exports = app;
