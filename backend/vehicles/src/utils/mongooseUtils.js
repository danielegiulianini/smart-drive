const mongoose = require("mongoose");

const connect = async (dbConfig) => {
  return mongoose.connect(dbConfig.connectionUri, {
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

const disconnect = async (dbConfig) => {
  return mongoose.disconnect();
};

module.exports = {
  connect,
  disconnect,
};