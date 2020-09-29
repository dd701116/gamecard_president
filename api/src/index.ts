/**
 *  IMPORT External Dependencies
 */
import http from 'http';
import socketio from 'socket.io';
import express from 'express';
import bodyParser from "body-parser";

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



httpServer.listen(port, ()=> console.log(`Server listening: http://localhost:${port}`));
