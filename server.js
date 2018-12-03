const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');

const mongoConnect = require('./util/database').mongoConnect;
const mongodb = require('mongodb');

const Task = require('./models/task');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Uncomment to serve Vue app 
// app.use(express.static(__dirname + '/dist'));

// Connect to the database then listen
mongoConnect(() => {
    app.listen(3000);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/tasks', (req, res, next) => {
    Task.getAllTasks()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        });   
});

app.post('/api/tasks', (req, res, next) => {  
    const data = req.body;
    const task = new Task(data.taskName, data.day);
    task.save();
    res.status(201).json(task); 
    next();
});

app.delete('/api/tasks/:id', (req, res, next) => {  
    Task.deleteByID({_id: new mongodb.ObjectId(req.params.id)});
    next();
});