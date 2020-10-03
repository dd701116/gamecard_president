import {Server} from "socket.io";
import {Express} from "express";
import {ExpressRoute, SocketRoute} from "./network/Protocol";
import bodyParser from "body-parser";

export default class App {

    private config: any;
    private expressApp: Express;
    private serverSoket: Server;
    private services: Array<{name : string, resource : any}>;

    constructor(config : any, expressApp : Express, serverSoket : Server, ...services : Array<{name : string, resource : any}>){
        this.config = config;
        this.expressApp = expressApp;
        this.serverSoket = serverSoket;
        this.services = services;
    }


    initExpress(){
        this.expressApp.get('/', ExpressRoute.test);

        this.expressApp.get(`/${this.config.api.version}/player/signup`, ((req, res) => {
            ExpressRoute.signup(this.Service("player")?.resource, req, res);
        }));

        this.expressApp.get(`/${this.config.api.version}/player/signin`, ((req, res) => {
            ExpressRoute.signin(this.Service("player")?.resource, req, res);
        }));

        this.expressApp.get(`/${this.config.api.version}/player/:id`, ((req, res) => {
            ExpressRoute.player(this.Service("player")?.resource, req, res);
        }));

        this.expressApp.get(`/${this.config.api.version}/player/:id/picture`, ((req, res) => {
            ExpressRoute.playerPicture(this.Service("player")?.resource, req, res);
        }));

        this.expressApp.get(`/${this.config.api.version}/card/:id/picture`, ((req, res) => {
            ExpressRoute.cardPicture(this.Service("card")?.resource, req, res);
        }));
    }

    initSocket(){
        this.serverSoket.on("connection", (socket => {

            socket.on(`/${this.config.api.version}/game/join`, (data) => {
                SocketRoute.joinGame(this.Service("game")?.resource, data);
            });

            socket.on(`/${this.config.api.version}/game/readyToPlay`, (data) =>{
                SocketRoute.readyToPlay(this.Service("game")?.resource, data);
            });

            socket.on(`/${this.config.api.version}/game/play`, (data) =>{
                SocketRoute.play(this.Service("game")?.resource, data);
            });

            socket.on(`/${this.config.api.version}/game/invite`, (data) =>{
                SocketRoute.invitePlayer(this.Service("game")?.resource, data);
            });

            socket.on(`/${this.config.api.version}/game/leave`, (data) =>{
                SocketRoute.leave(this.Service("game")?.resource, data);
            });

            socket.on(`/${this.config.api.version}/game/chat`, (data) =>{
                SocketRoute.play(this.Service("chat")?.resource, data);
            });

        }))
    }

    init() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.initExpress();
    }

    Service(name : string) : { name: string; resource: any } | undefined{
        return this.services? this.services.find(service => service.name === name) : undefined;
    }
}
