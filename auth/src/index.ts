/**
 *  IMPORT External Dependencies
 */
import http from 'http';
import express from 'express';
import fs from 'fs';
import path from "path";
import mongodb from 'mongodb';

/**
 *  IMPORT Internal Dependances
 */
//  App
//  Services
import PlayerService from "./service/PlayerService";
import App from "./App";


const port = 5001;
const expressApp = express();
const APP_MODE = "developpement";

const httpServer = http.createServer(expressApp);


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



    /**
     *  INIT - SERVICES
     */


    //  PlayerService

    let playerService = new PlayerService(config, {
        name:"mongodb", ressource: database.collection("player")
    });




    /**
     *  INIT - APP
     */

    let app = new App(config, expressApp, {
        name : "player",
        resource : playerService
    });

    app.init();

})();

httpServer.listen(port, ()=> console.log(`Server listening: http://localhost:${port}`));
