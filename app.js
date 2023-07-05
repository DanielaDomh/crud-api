const express = require ("express");
const db = require('./utils/database');
const ToDo = require('./models/to.do.models');
require('dotenv').config();
ToDo;

const PORT = process.env.PORT ?? 5000;

db.authenticate()
.then(() => {
    console.log('Base de datos conectada');
})
.catch(error => console.log('error'))

db.sync()
.then(() => console.log('Base de datos sincronizada'))
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("To Do List")
});

//Create
app.post('/todos', async (req, res) => {
    try {
         const newTask = req.body; 
         const task = await ToDo.create(newTask);
         res.status(201).json(task);
    } catch(error) {
         res.status(400).json(error);
    }
 })

 //FindAll
 app.get('/todos', async (req, res) => {
    try {
        const tasks = await ToDo.findAll();
        res.json(tasks);
    } catch {
        res.status(400).json(error);
    }
});

//Get by ID
app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const task = await ToDo.findByPk(id);
        res.json(task);
    } catch(error) {
        res.status(400).json(error);
    }
});

//Update
app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const taskInfo = req.body;
        await ToDo.update(taskInfo, {
            where: {id}
        })
        res.status(204).send();
    } catch(error) {
        res.status(400).json(error);
    }
});

//Delete
app.delete('/todos/:id', async(req, res) => {
    try{
     const { id } = req.params;
     await ToDo.destroy({
         where: {id}
     });
     response.status(204).send();
    } catch (error) {
     res.status(400).json(error);
    } 
 })

app.listen(PORT, () => {
    console.log(`Servidor escuchando desde el puerto${PORT}`)
})

console.log(process.env);
