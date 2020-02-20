const express = require('express');

const server = express();

server.use(express.json());

const projects=[
  {
    id: 0,
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

//CRUD
//Create
//Cria e armazena novo usuario - ( A funçao foi modificada para gerar o id automaticamente )
server.post('/projects',(req,res)=>{
  const project = {
    id:projects.length,
    ...req.body,
  }
  projects.push(project);
  return res.json({
    "message":"Projeto criado com sucesso",
    "projects":projects,
  })
});

//Read
//Retorna todos os usuarios
server.get('/projects',(req,res)=>{
  return res.json(projects);
});

//Update
server.put('/projects/:id',(req,res)=>{
  projects[req.params.id].title = req.body.title;
  return res.json({
    "message":"Projeto atualizado com sucesso",
    "projects":projects,
  })
});
//Delete


server.listen(3000);