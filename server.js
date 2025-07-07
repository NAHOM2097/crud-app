const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

let listName = [];

app.get('/', (req, res) => {
    res.send('Hello from frontend');
})

app.get('/names', (req, res) => {
    res.json(listName);
})

app.post('/names', (req, res) => {
    listName.push(req.body.name);
    console.log(listName);
    res.status(201).send("Name added Successfully");
})

app.delete('/names/:index', (req, res) => {
    const index = req.params.index;
    listName.splice(index, 1);
    console.log(listName);
    res.status(203).send("Name deleted Successfully");
})

app.put('/names/:index' , (req,res) => {
    const index = req.params.index ;
    listName[index] = req.body.updatedName ;
    console.log(`Updated index ${index} to : ${listName[index]}`);
    res.status(205).send("Name updated Successfully") ;
})

app.listen(port, () => {
    console.log(`Port running on localhost:${port}`);
})