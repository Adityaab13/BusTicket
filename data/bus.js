const { ObjectId } = require('bson');
const mongoCollections = require('../config/mongoCollections');
const bus = mongoCollections.bus;

module.exports = {

    async create_bus(companyName, busType, busNumber, startCity, destination, totalSeats, availableSeats, pricePerSeat){

        const busCollection = await bus();
    
        let newBus = {
          companyName : companyName,
          busType : busType, 
          busNumber : busNumber, 
          startCity : startCity, 
          destination : destination, 
          totalSeats : totalSeats, 
          availableSeats : availableSeats, 
          pricePerSeat : pricePerSeat,
          rating : []
        };
    
        const insertInfo = await busCollection.insertOne(newBus);
        if (insertInfo.insertedCount === 0) throw 'Could not add bus';
    
        return { userInserted : true };
      },
    }