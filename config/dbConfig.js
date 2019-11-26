//native pool of postgress to run direct sql queries
const {Pool} = require('pg');
const dbPool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    database: 'postgres',
    password: 'root',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const nativePool = dbPool;

//knex options for for db creation
const knexDbConConfigOptions = {
    client: 'pg',
    version: '10.10',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'root',
        database: 'postgres'
    },
    pool: {min: 0, max: 100}
};

const knexPool = require('knex')(knexDbConConfigOptions);

// firebase
/*const admin = require('firebase-admin');
const serviceAccount = require("../admin-sdk.json");s
const fire = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vneo-c2935.firebaseio.com"
});*/

const vNeoAppAuth = undefined;
const vNeoAppDb = undefined;

module.exports = {
    nativePostgresPool: nativePool,
    knexPool: knexPool,
    vNeoAppAuth: vNeoAppAuth,
    vNeoAppDb: vNeoAppDb,
};