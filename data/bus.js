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

    async selectBus(startCity, destination){

        const busCollection = await bus();
        let busData = await busCollection.find({startCity: startCity, destination: destination}).toArray();
        if(busData.length === 0) throw "No bus exist in this track";
          
        return busData;
      },
  
    async selectBusByName(companyName){
  
        const busCollection = await bus();
        let busData = await busCollection.find({companyName:companyName}).toArray();
        if(busData.length === 0) throw ` ${this.companyName} doesn't exist `;
          
        return busData;
      },

    }