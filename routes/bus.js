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

router.post('/route_select', async(req,res) => {
    try{
        let start = req.body.from;
        let end = req.body.to;
        let cn = req.body.companyName;
        if (!start && !end && cn) {
            let name = req.body.companyName;
            const existedCompany = await data.selectBusByName(name);
            res.render("route_selection/route_selection",{allBusByName:existedCompany});
            return;
        }
        else {
            const existedroute = await data.selectBus(start,end);
            res.render("route_selection/route_selection",{allBus:existedroute});
            return;
        }
    }
    catch(e){
        res.json({error:e});
    }
});

router.get('/route_select', async(req,res) => {
    res.render('route_selection/route_selection');
    return;
});



module.exports = router;