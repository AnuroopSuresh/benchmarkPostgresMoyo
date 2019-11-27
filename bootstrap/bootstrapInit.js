const {nativePostgresPool, knexPool, vNeoAppAuth, vNeoAppDb} = require('../config/dbConfig');
module.exports.start = async function () {
    let client;
    try {

        // write you initial setup code here
        console.log('bootstrapInit:start: init ');

        client = await nativePostgresPool.connect();
        const queryStr =
            `CREATE TABLE IF NOT EXISTS "User" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                phone VARCHAR(20)
            );
            CREATE TABLE IF NOT EXISTS "Channel" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                channelid VARCHAR(100) NULL
            );
            CREATE TABLE IF NOT EXISTS "Moyo" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                description VARCHAR(255),
                channelid VARCHAR(100),
                status VARCHAR(20),
                Channel int NULL REFERENCES "Channel"(id)
            );
            CREATE TABLE IF NOT EXISTS "USER_MOYO_JUNCTION" (
                id SERIAL PRIMARY KEY,
                "User" INT NULL REFERENCES "User"(id),
                "Moyo" INT NULL REFERENCES "Moyo"(id)
            );`;

        const queryResult = await client.query(queryStr);
        console.log('bootstrapInit:start: Table created if not exist ', queryResult.rows);

    } catch (e) {
        console.log('bootstrapInit.function: ', e);
    } finally {
        client.release();
    }
};