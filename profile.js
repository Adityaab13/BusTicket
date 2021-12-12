const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var moment = require('moment');
const router = express.Router();
const xss = require('xss');
router.post("/", async (req, res, next) => {
    const { firstName, lastName, dob, email, password, mobile, userId } = req.body;
    console.log(req.body);
    try {
        try {
            if (!firstName || !lastName || !dob || !email || !password || !mobile || !userId)
                throw 'All field need to have valid values';
            if (firstName === "" || lastName === "" || dob === "" || email === "" || password === "" || mobile === "" || userId == "")
                throw 'All field should not be be empty or null';
            const phoneRegex = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/;

            if (!mobile.match(phoneRegex))
                throw 'phoneNo should be in this format xxx-xxx-xxxx';

        }
        catch (e) {
            if (e && e.message) {
                res.status(400).json({ error: e.message });
            }
            else {
                res.status(400).json({ error: e });
            }
            return;
        }


        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let prasedDate = Date.parse(req.body.dob);
        let _dobObject = new Date(prasedDate);
        let user = {
            firstName: xss(firstName),
            lastName: xss(lastName),
            name: xss(req.body.firstName),
            email: xss(req.body.email),
            password: hashPassword,
            mobile: xss(req.body.mobile),
            dob: moment(xss(_dobObject)).format('YYYY-MM-DD')
        }
        // let updateUser = new User(user)

        console.log(user);
        //console.log(busWithRatingUpdate);
        User.findOneAndUpdate({ _id: xss(userId) }, user, { upsert: true }, function (err, doc) {
            if (err) console.log(err)
            else res.status(200).json({ success: true });
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
        return;
    }
});


router.get("/:id", async (req, res, next) => {

    let userId = xss(req.params.id);
    try {

        if (!userId) throw 'You must provide an userId to search for';
        if (typeof userId !== "string") throw 'userId must be string';
    } catch (e) {
        if (e && e.message) {
            res.status(400).json({ error: e.message });
        }
        else {
            res.status(400).json({ error: e });
        }
        return;
    }
    try {


        User.find({ _id: userId }, (err, doc) => {
            if (err) {
                res.json({ status: false, message: "error while searching with ID" })
            }
            else
                res.json({ doc })
        });
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
});

// router.get('/Login', (req, res) => {
//     res.send("Login Here")
// })

module.exports = router;