const username = "MongoUsers"; //process.env.USERS_DB_ROOT_USERNAME;
const password = "MongoUsers22$"; //process.env.USERS_DB_ROOT_PASSWORD;
const host = "mongodb-users";
const port = 27017; //process.env.USERS_DB_MONGO_INTERNAL_PORT; //default mongodb port
const defaultAuthDb = "admin";
const options = ["retryWrites=true", "w=majority"];

/*
 * URI Format : mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
 * Source: https://docs.mongodb.com/manual/reference/connection-string/
 */
//include port in connection string (if defined).
//if not defined: enable dns lookup with +srv

function getConnectionUri(
  port,
  username,
  password,
  host,
  defaultAuthDb,
  options
) {
  return `mongodb${port ? "" : "+srv"}://${username}:${password}@${host}${
    port ? ":" + port : ""
  }/${defaultAuthDb}?${options.join("&")}`;
} //const getConnectionUri = require('../../sharedUtils/mongoDbUtils.js');





connectionUri = getConnectionUri(
  port,
  username,
  password,
  host,
  defaultAuthDb,
  options
);

console.log(
  ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><il connection uri is: " +
    connectionUri +
    ">>>>>>>>>>>>>>>>>>>>>>>>>>><"
);

module.exports = {
  connectionUri,
};
