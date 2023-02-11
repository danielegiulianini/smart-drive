const username = process.env.TRIPS_DB_ROOT_USERNAME;
const password = process.env.TRIPS_DB_ROOT_PASSWORD;// || 'users2022';
const host = 'mongodb-users';
const port = process.env.TRIPS_DB_MONGO_INTERNAL_PORT// || 27017; //default mongodb port
const defaultAuthDb = 'admin';
const options = [
    'retryWrites=true',
    'w=majority',
];

/*
* URI Format : mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
* Source: https://docs.mongodb.com/manual/reference/connection-string/
include port in connection string (if defined).
if not defined: enable dns lookup with +srv
*/

function getConnectionUri(port, username, password, host, defaultAuthDb, options){
    return `mongodb${port ? '' : '+srv'}://${username}:${password}@${host}${port ? ':' + port : ''}/${defaultAuthDb}?${options.join('&')}&authSource=admin`;
}
connectionUri = getConnectionUri(port, username, password, host, defaultAuthDb, options);


module.exports = {
    connectionUri,
}