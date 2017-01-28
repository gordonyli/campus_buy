var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://adv:adv@ds033259.mlab.com:33259/campus_buy", ['tasks']);

//get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
});

//get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
});

//save tasks
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error":"bad data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

//delete task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
});

//update
router.put('/task/:id', function(req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone;
    }    

    if (task.title) {
        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error":"Bad data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
    }

});
module.exports = router;