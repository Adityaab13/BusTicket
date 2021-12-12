var express = require('express');
var router = express.Router();
var bus = require('../models/Buses');
const xss = require('xss');


router.post('/', (req, res) => {

    bus.find({ 'startCity': xss(req.body.startCity), 'destination': xss(req.body.destination) }).exec((err, bus) => {
        if (err) {
            res.json({ status: false, message: "error while searching" })
        }
        else res.json({ bus })
    })
});

router.post('/', (req, res) => {

    bus.find({ _id: xss(req.body.bId) }, (err, bus) => {
        if (err) {
            res.json({ status: false, message: "error while searching with ID" })
        }
        else
            res.json({ bus })
    })
});

module.exports = router;