const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const xss = require('xss');
const router = express.Router();


router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if(!email){
        throw "email is not provided"
    }
    if(!password){
        throw "password is not provided"
    }
    try {
        User.findOne({ email: xss(email) }, (err, doc) => {
            console.log(doc);
            if (err) { } else {
                if (!doc) { } else {
                    bcrypt.compare(xss(password), doc.password, function (error, response) {
                        console.log(response);
                        const token = jwt.sign({ doc }, "top_secret");
                        res.status(200).json({ token });
                    });
                }
            }
        });
    } catch (error) { }
});


router.get("/loginguest", async (req, res, next) => {


    let user = {
        name: "Guest",
        email: 'guest@guest.com',
        password: 'dummypassword',
        mobile: '123-123-1234',
        gender: 'dummy gender',
        dob: '12-08-21'
    }
    let newUser = new User(user)
    // console.log(newUser)
    newUser.save((err, reslut) => {
        console.log(err);
        try {
            User.findOne({ _id: reslut._id }, (err, doc) => {
                console.log(doc);
                if (err) { } else {
                    if (!doc) { } else 
                    {
                        const token = jwt.sign({ doc }, "top_secret");
                        res.status(200).json({ token });
                    }
                }
            });
        } catch (error) {
            console.log(error)
            res.status(500).send({ error })
        }
    })

});


module.exports = router;