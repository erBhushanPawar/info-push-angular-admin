/**
 * @name realtime-v1-api
 * @description This module packages the Realtime API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
var onesignal = require('node-opensignal-api');
var socketServer = require("../scripts/socket-server")
let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);
express.response.sendError = function (err) {
    serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
    serverResponse.sendOk(this, { result });
};

let api = express.Router();
var onesignal_client = onesignal.createClient();
var onesignalConfig = {
    app_id: "ee634c19-6b0e-4a75-a5d8-0904b1aa6c68",
    restApiKey: "OGM0YzU4MTgtZmEwNS00NTQwLWEyOWYtNDNkYTljYjk4YmQw"
}
var appAuthKey = onesignalConfig.restApiKey;
var restApiKey = appAuthKey;
var params = {
    app_id: onesignalConfig.app_id,
    "included_segments": ["Active Users"],
    "data": { "foo": "bar" },
    "headings": { "en": "Custom notif for you !" },
    "contents": { "en": "Click to check nearby offers !" },
    "chrome_web_icon": "http://res.cloudinary.com/brainethic/image/upload/v1479013437/smallPE_f2sjfo.jpg",
    "orgUrl": "http://pennyearn.com/pe/waiter.html",
    "url": "http://pennyearn.com/pe/waiter.html",
    "big_picture": "http://res.cloudinary.com/brainethic/image/upload/v1479013437/smallPE_f2sjfo.jpg",
    "buttons": [
        { "id": "id1", "text": "Share Now", "icon": "ic_menu_share" },
        { "id": "id2", "text": "Open", "icon": "ic_menu_open" }
    ]
}

var customerIds;

api.get('/',
    (req, res) => {
        res.sendOk({ greeting: 'Welcome to Hydra Express!' });
    });


api.get('/get-all-devices', (req, res) => {
    onesignal_client.players.viewall(appAuthKey,
        {
            app_id: onesignalConfig.app_id, device_type: 1
        },
        function (err, response) {
            res.sendOk(response)
        })
});

api.get("/get-device-info", (req, res) => {
    if (!req.query.playerId) {
        res.sendError({
            err: "Please provide playerId"
        });
        return;
    }
    onesignal_client.players.view(req.query.playerId, function (err, response) {
        res.sendOk(response)
    })
})

api.post("/add-device-info", (req, res) => {
    res.sendOk(req.body)
})

api.get("/get-filtered-devices", (req, res) => {
    onesignal_client.players.viewall(appAuthKey,
        {
            app_id: onesignalConfig.app_id, device_type: 1
        },
        function (err, response) {
            res.sendOk(response)
        })
})

api.post("/create-notification", (req, res) => {
    let newNotif = req.body

    newNotif.app_id = onesignalConfig.app_id
    onesignal_client.notifications.create(restApiKey, newNotif, function (err, response) {
        if (err) {
            console.log('Encountered error', err);
            res.sendError(err)
        } else {
            console.log(response);
            res.sendOk(response)
        }
    });
})




module.exports = api;
