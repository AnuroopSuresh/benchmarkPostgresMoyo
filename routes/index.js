const express = require('express');
const router = express.Router();
const {nativePostgresPool, knexPool, vNeoAppAuth, vNeoAppDb} = require('../config/dbConfig');
const dummyData = require('../customUtils/dummyData');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/User', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();

        const dummyUser = dummyData.dummyUsers;

        /*const reqObject = req.body;

        const queryStr = `INSERT INTO "User" ("name","phone") VALUES ('${reqObject.name}','${reqObject.phone}') RETURNING *;`;
        const queryResult = await client.query(queryStr);*/
        let queryStr, queryResult;
        for (let user of dummyUser) {
            queryStr = `INSERT INTO "User" ("name","phone") VALUES ('${user.name}','${user.phone}') RETURNING *;`;
            queryResult = await client.query(queryStr);
        }
        //console.log('index./user: ', queryResult);
        res.send(queryResult.rows)

    } catch (e) {
        console.error('index./channel: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});


router.post('/Channel', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();
        const reqObject = req.body;

        const queryStr = `INSERT INTO "Channel" ("name") VALUES ('${reqObject.channelName}');`;
        const queryResult = await client.query(queryStr);
        res.send(queryResult)


    } catch (e) {
        console.error('index./channel: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});

router.post('/invite', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();

        const reqObject = req.body;

        const queryStr = `INSERT INTO "Channel" ("name") VALUES ('${reqObject.name}') RETURNING *;`;
        const queryResult = await client.query(queryStr);
        res.send(queryResult)

    } catch (e) {
        console.error('index./channel: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});

router.post('/publishMoyoToUser', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();

        let moyoList = dummyData.dummyMoyoList;
        let responseObj = [];
        for (let moyoObj of moyoList) {

            let queryStr = `INSERT INTO "Moyo" ("name","description","channelid","status") 
        VALUES ('${moyoObj.name}','${moyoObj.description}','${moyoObj.channelID}','${moyoObj.status}') RETURNING *;`;
            let queryResult = await client.query(queryStr);
            const insertedMoyoRow = queryResult.rows[0];
            responseObj.push(insertedMoyoRow);
            // get user id by phone number
            let userObj;
            for (let phone of moyoObj.Userlist) {
                queryStr = `SELECT * from "User" where "phone" like '${phone}'`;
                queryResult = await client.query(queryStr);
                userObj = queryResult.rows[0];
                if (userObj) {
                    queryStr = `INSERT INTO "USER_MOYO_JUNCTION" ("User","Moyo") VALUES (${userObj.id},${insertedMoyoRow.id})`;
                }
            }
        }

        res.send(responseObj)

    } catch (e) {
        console.error('index./publishMoyoToUser: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});

router.post('/getMoyosOfUsers', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();

        const reqObject = req.body;

        for (let phone of reqObject.users) {

        }
        const queryStr = `INSERT INTO "Channel" ("name") VALUES ('${reqObject.name}');`;
        const queryResult = await client.query(queryStr);
        res.send(queryResult)

    } catch (e) {
        console.error('index./channel: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});

module.exports = router;
