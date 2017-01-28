var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();
var port = 3000;
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')))

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Create routes
app.use('/', index);
//Create tasks
app.use('/api', tasks);

//Test git - Tony
app.use(express.static(__dirname + "/views"));

app.listen(port, function(){
    console.log("Server started on port " + port)
});