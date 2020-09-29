import PlayerInfo from "./PlayerInfo";
import GameFactory from "../service/GameFactory";
import {Server, Socket} from "socket.io";
import ResponseSocketApi from "./ResponseSocketApi";


export default class WaitingRoom {

    static NB_MAX_PLAYER : number = 6;
    static NB_MIN_PLAYER : number = 3;
    static NB_MAX_VERIFICATION : number = 60;

    private players : Array<[PlayerInfo, boolean]>;
    private interval : any;
    private lastTimeVerified : number;
    private nbVerification : number;
    private starting : boolean;
    private factory : GameFactory;
    private serverSocket : Server;
    private readonly id : string;

    constructor(factory : GameFactory, serverSocket : Server) {
        this.players = new Array<[PlayerInfo, boolean]>();
        this.lastTimeVerified = Date.now();
        this.nbVerification = 0;
        this.starting = false;
        this.factory = factory;
        this.serverSocket = serverSocket;
        this.id = WaitingRoom.generateId();
    }

    join(playerInfo : PlayerInfo, socket : Socket){
        //  Si il y a de la place et que la game n'est pas en train de commence
        if (this.players.length<WaitingRoom.NB_MAX_PLAYER && !this.starting){
            //  On ajoute le joueur
            this.players.push([playerInfo, false]);
            // On ajoute le joueur dans la room
            socket.join(this.id);
        }

    }

    wait(){
        //  On sauvegarde la date de verification
        this.lastTimeVerified = Date.now();

        //  On lance le thread de verification
        this.interval = setInterval(()=>{

            //  Si il y a le nombre de joueur min
            if (this.players.length>=WaitingRoom.NB_MIN_PLAYER){

                //  On recuperer un joueur non pret
                let noReady = this.players.find( p => !p[1]);

                //  Si il n'y en a aucun
                if (noReady===undefined){
                    //  On lance la game
                    this.starting = true;
                    let game = this.factory.createGame(this);

                    //  Si le jeu a bien ete cree
                    if (game){

                        //  On annonce la creation
                        this.serverSocket.to(this.id).emit("game-create", new ResponseSocketApi(game.Info, true, `You are join the Game ${game.Id}`));

                    }else{
                        //  On annonce le faite qu'il n'y ai plus de place
                        this.serverSocket.to(this.id).emit("game-create", new ResponseSocketApi(new Error("Server Full"), false, "The server is full, no game can launch now."));
                    }

                    //  On libere le thread d'attente
                    clearInterval(this.interval);

                }


            }

            this.nbVerification++;
            if (this.nbVerification>=WaitingRoom.NB_MAX_VERIFICATION){
                //  On annonce le timeout
                this.serverSocket.to(this.id).emit("game-create", new ResponseSocketApi(new Error("Server timeout"), false, "The WaitingRoom have a timeout"));
                //  On libere le thread d'attente
                clearInterval(this.interval);
            }


        }, 5000);

    }

    get Players(){
        let players = new Array<PlayerInfo>();
        this.players.forEach(player => {
            players.push(player[0]);
        });
        return players;

    }

    ready(playerInfo : PlayerInfo){
        let player = this.players.find(p => p[0].equals(playerInfo));
        if (player){
            player[1] = true;
        }
    }

    static generateId(length = 5) {
        // function inspired from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return "W-"+result;
    }
}
