/**
 *  IMPORT External Dependencies
 */
import http from 'http';
import socketio from 'socket.io';
import express from 'express';
import bodyParser from "body-parser";
import fs from 'fs';
import path from "path";
import mongodb from 'mongodb';
import firebase from "firebase-admin";

/**
 *  IMPORT Internal Dependances
 */
//  App
import App from './App';
//  Services
import CardService from "./service/CardService";
import ChatService from "./service/ChatService";
import PlayerService from "./service/PlayerService";
import GameFactory from "./service/GameFactory";
import {log} from "util";


const port = 5000;
const expressApp = express();
const APP_MODE = "developpement";

const httpServer = http.createServer(expressApp);
const io = socketio(httpServer);

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var serviceAccount = require("./gamecard-president-dadf3-firebase-adminsdk-njv9d-ac6a0d934b.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://gamecard-president-dadf3.firebaseio.com"
});

let bucket = firebase.storage().bucket("gs://gamecard-president-dadf3.appspot.com/");
//bucket.getFiles().then((res) => console.log(res));
let file = bucket.file("card/1X/PixelPlebes_1x__Update001_02.png");
//file.get().then(res => console.log(res));
//file.getMetadata().then( res => console.log(res));


expressApp.get("/", (req, res) =>{
    file.download().then(content => res.send(content[0]), err => console.log(err));

});


let mongoUser,
    mongoPasswd,
    mongoDbname,
    uri,
    mongoClient,
    config;

(async ()=>{

    /**
     *  INIT - CONFIG
     */
    let config_str = fs.readFileSync(path.resolve(__dirname,'config.json'));
    config = JSON.parse(config_str.toString())[APP_MODE];
    mongoUser = config.mongodb.user;
    mongoPasswd = config.mongodb.passwd;
    mongoDbname = config.mongodb.dbname;

    uri = `mongodb+srv://${mongoUser}:${mongoPasswd}@cluster0.txfce.mongodb.net`;

    console.log(uri);

    mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await mongoClient.connect();
    let database = mongoClient.db(mongoDbname);

    let cursor = database.collection("card").find({value:1});
    cursor.toArray().then(documents => console.log(documents));

})();

httpServer.listen(port, ()=> console.log(`Server listening: http://localhost:${port}`));
