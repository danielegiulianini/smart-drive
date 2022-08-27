const username = process.env.USERS_DB_ROOT_USERNAME;
const password = process.env.USERS_DB_ROOT_PASSWORD;// || 'users2022';
const host = 'mongodb-users';
const port = process.env.USERS_DB_MONGO_INTERNAL_PORT || 27017; //default mongodb port
const defaultAuthDb = 'admin';
const options = [
    'retryWrites=true',
    'w=majority',
];

/*
* URI Format : mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
* Source: https://docs.mongodb.com/manual/reference/connection-string/
*/
const connectionUri = `mongodb${port ? '' : '+srv'}://${username}:${password}@${host}${port ? ':' + port : ''}/${defaultAuthDb}?${options.join('&')}`;

console.log("il connection uri is: " + connectionUri);

module.exports = {
    connectionUri,
}