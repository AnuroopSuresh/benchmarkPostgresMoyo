const express = require('express');
const router = express.Router();
const {nativePostgresPool, knexPool, vNeoAppAuth, vNeoAppDb} = require('../config/dbConfig');

/* GET users listing. */
/*router.post('/createUser', async function (req, res) {
    try {

        const reqBody = req.body;
        const auth = vNeoAppAuth;
        const knex = knexPool;

        const docs = await vNeoAppDb.collection('Users').where('userId', '==', reqBody.userId).get();
        if (docs.size === 0) {
            const doc = vNeoAppDb.collection("phoneNumber").doc('nextPhoneNumber').get();
            const phoneNumber = doc.data().phoneNumber;
            const authObj = {
                phoneNumber: "+91" + phoneNumber,
                password: reqBody.password,
                disabled: !!reqBody.disabled
            };

            const user = await auth.createUser(authObj);

            const writepromises = [];
            writepromises.push(doc.ref.update({
                phoneNumber: phoneNumber + 1
            }));
            const userObj = {
                Disabled: false,
                Mobile: "+91" + phoneNumber,
                Password: reqBody.password,
                UserId: reqBody.userId,
                uuid: user.uid,
                CreatedAt: moment.utc().valueOf(),
                UpdatedAt: moment.utc().valueOf(),
                AuthMode: 'custom',
                Org: reqBody.org
            };

            await vNeoAppDb.collection('Users').doc().set(userObj);

            await knex('users').insert({
                uuid: userObj.uuid,
                userName: userObj.UserName ? userObj.UserName : null,
                authMode: userObj.AuthMode,
                email: userObj.Email ? userObj.Email : null,
                mobileNumber: userObj.Mobile ? userObj.Mobile : null,
                customUserId: userObj.UserId ? userObj.UserId : null,
                disabled: !!userObj.Disabled,
                password: userObj.Password,
                org: userObj.Org,
                createdAt: userObj.CreatedAt,
                updatedAt: userObj.updatedAt
            });

            res.json({
                status: 200,
                user: userObj
            })

        } else {
            throw new Error('User Already Exist')
        }


    } catch (e) {
        console.error('users./createUser: ', e);
        res.status(400).send("Bad Request " + e.message)
    }
});


router.post('/addUser', async function (req, res) {
    try {
        const payload = req.body;
        const dbObj = vNeoAppDb;

        const docs = dbObj.collection('Users').where('Mobile', "==", payload.mobileNumber).get();
        if (docs.size === 0) {
            const doc = dbObj.collection('Users').doc().set(payload);

            const keys = Object.keys(payload);
            keys.map(key => {
                if (payload[key] === '' || payload[key] === undefined) {
                    payload[key] = null
                }
                return ''
            });
            payload['createdAt'] = moment.utc().valueOf();
            payload['updatedAt'] = moment.utc().valueOf();
            console.log('adding user');
            knexPool('users').insert(payload);

            res.json({
                status: 200,
                docId: doc.id,
            })
        } else {
            throw new Error('Opps Something went wrong')
        }
    } catch (e) {
        console.error('users./addUser: ', e);
        res.status(400).send("Bad Request " + e.message)
    }
});


router.post('/getLoginToken', async function (req, res) {
    try {
        const uuid = req.body.uuid;

        const token = vNeoAppAuth.createCustomToken(uuid);

        res.json({
            status: 200,
            token: token
        })

    } catch (e) {
        console.error('users./getLoginToken: ', e);
        res.status(400).send("Bad Request " + e.message)
    }
});*/

router.post('', async function (req, res) {
    let client;
    try {
        client = await nativePostgresPool.connect();
        const userObj = req.body;

        const queryStr = `INSERT INTO "User" ("name","mobile") VALUES ('${userObj.name}','${userObj.mobile}');`;
        const queryResult = await client.query(queryStr);
        res.send(queryResult)

    } catch (e) {
        console.error('users.post: ', e);
        res.status(400).send("Bad Request " + e.message)
    } finally {
        client.release();
    }
});
module.exports = router;
