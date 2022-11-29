const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const event_name = req.body.event_name;
    const activity_name = req.body.activity_name;
    const no_of_days = Number(req.body.no_of_days);
    const activity_duration = req.body.activity_duration;

    const newTask = new Task({
        event_name, activity_name, no_of_days, activity_duration
    });

    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;