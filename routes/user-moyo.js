const express = require('express');
const router = express.Router();
const {nativePostgresPool, knexPool, vNeoAppAuth, vNeoAppDb} = require('../config/dbConfig');

router.put('', async function (req, res) {
    try {



    } catch (e) {
        console.error('user-moyo.put: ', e);
        res.status(400).send("Bad Request " + e.message)
    }
});

module.exports = router;