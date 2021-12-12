const express = require('express');
const User = require("../models/User");
const router = express.Router();
const xss = require('xss');

//Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
    res.json({
        user: xss(req.user),
        token: xss(req.query.secret_token)
    })
});

router.get("/all", async (req, res, next) => {

    try {
        User.find({}, (err, doc) => {
            if (err) {
                res.json({ status: false, message: "error while searching with ID" })
            }
            else
                res.json({ doc })
        });
    } catch (error) { }

});


module.exports = router;