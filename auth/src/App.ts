import {Express} from "express";
import {ExpressRoute} from "./network/Protocol";
import bodyParser from "body-parser";

export default class App {

    private config: any;
    private expressApp: Express;
    private services: Array<{name : string, resource : any}>;

    constructor(config : any, expressApp : Express, ...services : Array<{name : string, resource : any}>){
        this.config = config;
        this.expressApp = expressApp;
        this.services = services;
    }


    initExpress(){
        this.expressApp.get('/', ExpressRoute.test);

        this.expressApp.post(`/${this.config.api.version}/player/signup`, ((req, res) => {
            ExpressRoute.signup(this.Service("player")?.resource, req, res);
        }));

        this.expressApp.post(`/${this.config.api.version}/player/signin`, ((req, res) => {
            ExpressRoute.signin(this.Service("player")?.resource, req, res);
        }));

        this.expressApp.post(`/${this.config.api.version}/player/token`, ((req, res) => {
            console.log("[TODO] : Token");
        }));

        this.expressApp.post(`/${this.config.api.version}/player/checkEmail`, ((req, res) => {
            ExpressRoute.checkEmail(this.Service("player")?.resource, req, res);
        }));
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
