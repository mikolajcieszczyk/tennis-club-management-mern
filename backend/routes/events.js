const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;
    const coach = req.body.coach;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const courtNumber = req.body.courtNumber;
    const group = req.body.group;
    const price = req.body.price;

    const newEvent = new Event({
        id,
        username,
        title,
        description,
        coach,
        start_time,
        end_time,
        courtNumber,
        group,
        price
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            event.id =  req.body.id;
            event.username = req.body.username;
            event.title = req.body.title;
            event.description = req.body.description;
            event.coach = req.body.coach;
            event.start_time = req.body.start_time;
            event.end_time = req.body.end_time;
            event.courtNumber = req.body.courtNumber;
            event.group = req.body.group;
            event.price = req.body.price;

            event.save()
                .then(() => res.json('Event updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;