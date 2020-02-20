const express = require('express');

const server = express();

server.use(express.json());


// variaveis globais
const projects=[
  {
    id: 0,
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];
let countAcess=0;

//Middlewares
//Globais
server.use((req,res,next)=>{
console.log(`numero de requisiçoes ao servidor:${++countAcess}`);
next();
});
//Especificos
function projectExists(req,res,next){
  const project = projects[req.params.id];
  if(project){
    next();
  }else{
    return res.status(400).json({
      "message":"Nao  existe um projeto com o id informado"
    })
  }
};
function titleIsInformed(req,res,next){
  req.title = req.body.title
  if(req.title){
    next();
  }else{
    return res.status(400).json({
      "message":"É necessario informar um titulo"
    })
  }
};

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
// Criar e armazena novas tarefas no projeto de if informado
server.post('/projects/:id/tasks',projectExists,titleIsInformed,(req,res)=>{
  projects[req.params.id].tasks.push(req.title);
  return res.json({
    "message":"Tarefa criada com sucesso",
    "project":projects[req.params.id],
  })
});
//Read
//Retorna todos os usuarios
server.get('/projects',(req,res)=>{
  return res.json(projects);
});
//Update
//Atualiza o titulo do projeto com o id informado
server.put('/projects/:id',projectExists,titleIsInformed,(req,res)=>{
  projects[req.params.id].title = req.title;
  return res.json({
    "message":"Projeto atualizado com sucesso",
    "projects":projects,
  })
});
//Delete
//Apaga o projeto com id informado
server.delete('/projects/:id',projectExists,(req,res)=>{
  projects.splice(req.params.id, 1);
  return res.json({
    "message":"Projeto deletado com sucesso",
    "projects":projects,
  })
});

server.listen(3000);