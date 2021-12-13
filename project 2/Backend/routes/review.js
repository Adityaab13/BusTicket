var express = require('express');
var router = express.Router();
var Bus = require('../models/Buses');
var bcrypt = require('bcrypt');
var moment = require('moment');
var bodyParser = require('body-parser')
const xss = require('xss');

//Body-Parser
var jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {
    try {
        const { bId, rating, userId } = req.body;
        console.log(req.body);
        if (!bId || !rating || !userId) {
            throw "All field Required"
        }
        if (bId == "" || rating == "" || userId == "") {
            throw "All field Required"
        }
        if (typeof rating !== "number"){
            throw 'Rating should be in number';
        }
        if (typeof rating === "number" && (rating < 1 || rating > 5)){
            throw 'Rating should be in number and it should be between 1-5';
        }
        Bus.findOne({ _id: xss(req.body.bId) }, (err, bus) => {
            if (err) {
                console.log(err);
            } else {
                if (!bus) {
                    console.log("not");
                    res.status(404).json({ success: false });
                } else {
                    console.log("in");
                    if (bus.reviews && bus.reviews.length > 0) {
                        let isReviewFound = false;
                        bus.reviews.forEach(element => {
                            if (element.userId == req.body.userId) {
                                element.rating = req.body.rating;
                                isReviewFound = true;
                            }
                        });
                        if (!isReviewFound) {
                            bus.reviews.push({ userId: xss(req.body.userId), rating: xss(req.body.rating) })
                        }
                    }
                    else {
                        console.log("no");
                        bus.reviews = [];
                        bus.reviews.push({ userId: req.body.userId, rating: req.body.rating })
                    }
                    let totalReviews = 0;
                    let overallRating = 0
                    bus.reviews.forEach(r => {
                        totalReviews += r.rating;
                    });

                    if (totalReviews > 0) {
                        overallRating = totalReviews / bus.reviews.length

                    }
                    bus.overAllReview = overallRating;

                    let busWithRatingUpdate = new Bus(bus);
                    Bus.findOneAndUpdate({ _id: xss(req.body.bId) }, busWithRatingUpdate, { upsert: true }, function (err, doc) {
                        if (err) console.log(err)
                        else res.status(200).json({ success: true, overAllReview: overallRating });
                    });
                }
            }
        });
    } catch (e) {
        console.log("af");
        console.log(e);
        if (e && e.message) {
            res.status(400).json({ error: e.message });
        }
        else {
            res.status(400).json({ error: e });
        }
        return;
    }
});

module.exports = router;