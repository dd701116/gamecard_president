import GameBoard from "./GameBoard";
import Player from "./Player";
import GameInfo from "./GameInfo";
import PlayerInfo from "./PlayerInfo";
import {Server, Socket} from "socket.io";
import ResponseSocketApi from "./ResponseSocketApi";
import Card from "./Card";
import Rules from "./Rules";
import Strike from "./Strike";


export default class Game {

    private id : string;
    private  turn : number;
    private board : GameBoard;
    private players : Array<Player>;
    private started : boolean;
    private lastTimePlayed : number;
    private interval : any;

    constructor(id : string, board : GameBoard, players : Array<Player>) {
        this.id = id;
        this.board = board;
        this.players = players;
        this.turn = 0;
        this.started = false;
        this.lastTimePlayed = 0;
        this.interval = null;
    }

    get Info(){
        //  On recupere les infos joueurs
        let playersInfo = new Array<PlayerInfo>();
        this.players.forEach(player => playersInfo.push(player.Info));


        return new GameInfo(this.id, playersInfo, this.board.Head);
    }

    start(serverSocket : Server){
        this.started = true;
        this.lastTimePlayed = Date.now();
        serverSocket.to(this.id).emit("game-start", new ResponseSocketApi(this.Info, true, `Starting Game : ${this.id}`));
    }

    end(serverSocket : Server){
        this.started = false;
        serverSocket.to(this.id).emit("game-end", new ResponseSocketApi(this.Info, true, `Ending Game : ${this.id}`));
    }

    play(serverSocket : Server, playerInfo : PlayerInfo, cards : Array<Card>){

        if (!this.started){
            return;
        }

        // On recupere  le joueur
        let player = this.players.find(p => p.Info.equals(playerInfo));

        //  On verifie qu'il peut jouer
        if (player && Rules.isPlayable(cards, this.board) && Rules.itsHisTurn(this.turn, player, this.players)){
            player.play(cards, this.board);
            this.turn++;

            //  On envoi la mise a jour
            serverSocket.to(this.id).emit("game-update", new ResponseSocketApi(this.Info, true, `${player.Info.Name} played his turn`));

            //  On recuprer le joueur suivant et on annonce son tour
            let nextPlayer = Rules.whosNext(this.turn, this.players);
            serverSocket.to(this.id).emit("game-whosnext", new ResponseSocketApi(nextPlayer.Info.PublicInfo, true, `${nextPlayer.Info.Name} is playing...`));

            //  On lance le processus d'attente de sa reponse
            this.wait(nextPlayer.Info, serverSocket);
        }
    }

    private wait(playerInfo : PlayerInfo, serverSocket : Server){

        //  On sauvegarde le debut de l'attente
        this.lastTimePlayed = Date.now();

        //  Si il y a deja un processus d'attente, on le libere
        if (this.interval){
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {

            //  On recupere la date actuel
            let now = Date.now();

            //  Si le joueur n'a pas joue avant 60 secondes, on lui ajoute un strike
            if (now - this.lastTimePlayed > 60000){
                playerInfo.addStrike(new Strike(`He left the game (${this.id})`, Date.now(), true));

                //  On annonce l'evenement au autre joueur
                serverSocket.to(this.id).emit("game-update", new ResponseSocketApi(this.Info, true, `${playerInfo.Name} has left the game !`));

                //  On arrete la game
                //  - Plus tard, on pourra le remplacer par un Bot
                this.end(serverSocket);
            }
        }, 60000);


    }

    static generateId(length = 5) {
        // function inspired from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return "G-"+result;
    }

    get Id(){
        return this.id;
    }


}
