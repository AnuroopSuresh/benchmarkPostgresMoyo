const express = require('express');
const router = express.Router();
const {nativePostgresPool, knexPool, vNeoAppAuth, vNeoAppDb} = require('../config/dbConfig');

router.post('', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();
        const reqObject = req.body;

        const queryStr = `INSERT INTO "Moyo" ("name") VALUES ('${reqObject.name}');`;
        const queryResult = await client.query(queryStr);
        res.send(queryResult)

    } catch (e) {
        console.error('Moyo.post: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});

module.exports = router;