const busRoutes = require('./bus');

const constructorMethod = (app) => {
  app.use('/', busRoutes);

};

module.exports = constructorMethod;
