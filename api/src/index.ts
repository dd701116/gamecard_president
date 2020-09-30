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

/**
 *  IMPORT Internal Dependances
 */
//  App
//  Services
import CardService, {PictureType} from "./service/CardService";
import FirebaseFacade from "./service/FirebaseFacade";
import Deck from "./item/Deck";


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

    uri = `${config.mongodb.protocol}://${config.mongodb.user}:${config.mongodb.passwd}@${config.mongodb.hostname}`;

    console.log(uri);

    mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await mongoClient.connect();
    let database = mongoClient.db(config.mongodb.dbname);

    firebase = new FirebaseFacade(config.firebase.credential, config.firebase.databaseUrl);
    firebase.init();

    let cardService = new CardService({
        name:"mongodb", ressource: database.collection("card")
    }, {
        name:"firebase", ressource: firebase
    });


    expressApp.get("/", (req, res) =>{
        let file = cardService.picture(PictureType.X1, "PixelPlebes_1x__Update001_00.png");
        if (file){
            file.download().then(content => res.send(content[0]), err => console.log(err));
        }else{
            res.send('Error');
        }

    });

    cardService.get({symbol:"heart", value:1})
        .then((card)=>{
            console.log(card);
        });

    cardService.deck().then((res) => {
        res.shuffle();
        console.log(res);
    },console.log).catch(err => console.log(err.message));

})();

httpServer.listen(port, ()=> console.log(`Server listening: http://localhost:${port}`));
