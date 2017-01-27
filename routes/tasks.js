var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://adv:adv@ds033259.mlab.com:33259/campus_buy", ['tasks']);

router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
});

module.exports = router;