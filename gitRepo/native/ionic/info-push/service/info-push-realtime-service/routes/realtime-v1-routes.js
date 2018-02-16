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

var conf = require('../config/onesignal.json');

let api = express.Router();

var onesignal_client = onesignal.createClient();
var onesignalConfig = conf

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/info-push");
mongoose.set("debug", true)

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


/**
 * Getting data models
 */

var catModel = require('../models/category-model');
var prodModel = require('../models/product-model');

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

api.post("/add-category", (req, res) => {

    new catModel(req.body).save((me, md) => {

        if (me) {

            res.sendError(me)
        }
        else {
            let newNotif = params
            newNotif.headings = {
                en: `New category ${req.body.name}`
            }

            newNotif.contents = { "en": "Click to check out details now !" },
                newNotif.app_id = onesignalConfig.app_id

            newNotif.data = req.body
            onesignal_client.notifications.create(restApiKey, newNotif, function (err, response) {
                if (err) {
                    console.log('Encountered error', err, newNotif);
                    err.isSaved = true
                    res.sendError(err)
                } else {
                    console.log(response);
                    response.isSaved = true
                    res.sendOk(response)
                }
            });
            //res.sendOk(md)
        }
    })
})

api.post("/add-snypse", (req, res) => {

    new prodModel(req.body).save((me, md) => {
        if (me) {
            res.sendError(me)
        }
        else {
            if (req.body.notify) {

                let newNotif = params
                newNotif.headings = {
                    en: `New Snypse ${req.body.title}`
                }
                newNotif.data = req.body
                newNotif.big_picture = req.body.img || params.big_picture
                newNotif.contents = { "en": "Click to check out details now !" },
                    newNotif.app_id = onesignalConfig.app_id
                onesignal_client.notifications.create(restApiKey, newNotif, function (err, response) {
                    if (err) {
                        console.log('Encountered error', err, newNotif);
                        err.isSaved = true
                        res.sendError(err)
                    } else {
                        console.log(response);
                        response.isSaved = true
                        res.sendOk(response)
                    }
                });
            }
            else{
                res.sendOk(md)
            }
        }
    })
})

api.get("/get-snypse", (req, res)=>{
  prodModel.find(req.body || {}, (me, md)=>{
    if(!me){
        res.sendOk(md)
    }
    else
    {
        res.sendError(me)
    }
  })  
})

api.get("/get-categories", (req, res)=>{
  catModel.find((me, md)=>{
    if(!me){
        res.sendOk(md)
    }
    else
    {
        res.sendError(me)
    }
  })  
})
api.post("/create-notification", (req, res) => {
    let newNotif = req.body

    newNotif.app_id = onesignalConfig.app_id
    onesignal_client.notifications.create(restApiKey, newNotif, function (err, response) {
        if (err) {
            console.log('Encountered error', err, newNotif);
            res.sendError(err)
        } else {
            console.log(response);
            res.sendOk(response)
        }
    });
})




module.exports = api;
