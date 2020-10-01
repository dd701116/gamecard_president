/**
 *  IMPORT External Dependencies
 */
import http from 'http';
import socketio from 'socket.io';
import express from 'express';
import fs from 'fs';
import path from "path";
import mongodb from 'mongodb';

/**
 *  IMPORT Internal Dependances
 */
//  App
//  Services
import CardService, {PictureType} from "./service/CardService";
import FirebaseFacade from "./service/FirebaseFacade";
import PlayerService from "./service/PlayerService";
import GameFactory from "./service/GameFactory";
import App from "./App";


const port = 5000;
const expressApp = express();
const APP_MODE = "developpement";

const httpServer = http.createServer(expressApp);
const socketServer = socketio(httpServer);


let firebase,
    uri,
    mongoClient,
    config;

(async ()=>{

    /**
     *  INIT - CONFIG
     */
    let config_str = fs.readFileSync(path.resolve(__dirname,'config.json'));
    config = JSON.parse(config_str.toString())[APP_MODE];


    /**
     *  INIT - DRIVERS
     */

    //  Mongodb

    uri = `${config.mongodb.protocol}://${config.mongodb.user}:${config.mongodb.passwd}@${config.mongodb.hostname}`;

    mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await mongoClient.connect();
    let database = mongoClient.db(config.mongodb.dbname);

    //  Firebase

    firebase = new FirebaseFacade(config.firebase.credential, config.firebase.databaseUrl);
    firebase.init();


    /**
     *  INIT - SERVICES
     */

    //  CardServices

    let cardService = new CardService(config,{
        name:"mongodb", ressource: database.collection("card")
    }, {
        name:"firebase", ressource: firebase
    });

    //  PlayerService

    let playerService = new PlayerService(config, {
        name:"mongodb", ressource: database.collection("player")
    }, {
        name:"firebase", ressource: firebase
    });


    //  GameFactory

    let gameFactory = new GameFactory(cardService);


    /**
     *  INIT - APP
     */

    let app = new App(config, expressApp, socketServer, {
        name : "card",
        resource : cardService
    },{
        name : "player",
        resource : playerService
    },{
        name : "game",
        resource : gameFactory
    });

    app.init();

})();

httpServer.listen(port, ()=> console.log(`Server listening: http://localhost:${port}`));
