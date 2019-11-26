const express = require('express');
const router = express.Router();
const {nativePostgresPool, knexPool, vNeoAppAuth, vNeoAppDb} = require('../config/dbConfig');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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

router.post('/User', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();

        const reqObject = req.body;

        const queryStr = `INSERT INTO "User" ("name","phone") VALUES ('${reqObject.name}','${reqObject.phone}');`;
        const queryResult = await client.query(queryStr);

        console.log('index./user: ', queryResult);
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

router.post('/publishMoyoToUser', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();

        const moyoObj = req.body.moyo;

        const queryStr = `INSERT INTO "Moyo" ("name","description","channelId","status") 
        VALUES ('${moyoObj.name}','${moyoObj.description}','${moyoObj.channelID}','${moyoObj.status}');`;
        const queryResult = await client.query(queryStr);
        console.log('index.queryResult: ',);
        res.send(queryResult)

    } catch (e) {
        console.error('index./channel: ', e);
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
