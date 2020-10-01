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
}
