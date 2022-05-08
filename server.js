// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`server is running on port ${port}`)
};
//a GET route that returns the projectData object 
app.get('/getData', (req, res)=> {
    res.send(JSON.stringify(projectData))
    projectData={}
});
//a POST route that adds incoming data to projectData
app.post('/', (req, res) =>{
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
    projectData=newEntry
    console.log(projectData)
});