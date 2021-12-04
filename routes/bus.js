const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data/bus');

router.get('/createBus', async(req,res) => {
    res.render('create_bus/create_bus');
    return;
});

router.post('/createBus', async(req,res) => {
    try{
        let newbus = await data.create_bus(req.body.companyName, req.body.busType, req.body.busNumber, req.body.startCity, req.body.destination, req.body.totalSeats, req.body.availableSeats, req.body.pricePerSeat);
        if(newbus.userInserted){
            res.redirect('/createBus');
        }
    }
    catch(e){
        res.status(400).json({error: e});
    }
});