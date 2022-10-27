//from: https://dev.to/remrkabledev/testing-with-mongodb-memory-server-4ja2

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

//const mongoServer = new MongoMemoryServer();
let mongo = null;

exports.dbConnect = async () => {
  mongo = await MongoMemoryServer.create();

  //const uri = await mongoServer.getUri();
  const uri = mongo.getUri();

  const mongooseOpts = {
    /*useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,*/
  };

  await mongoose.connect(uri, mongooseOpts);
};

exports.dbDisconnect = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop(); //mongoServer.stop();
  }
};

exports.dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({}); //collection.remove();
    }
  }
};
