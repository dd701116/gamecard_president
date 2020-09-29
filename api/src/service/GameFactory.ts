import Game from "../item/Game";
import WaitingRoom from "../item/WaitingRoom";
import GameBoard from "../item/GameBoard";
import Player from "../item/Player";
import {Server} from "socket.io";


export default class GameFactory {

    static NB_MAX_GAME : number = 10;

    private games : Array<Game>;
    private waitingRooms : Array<WaitingRoom>;

    constructor() {
        this.games = new Array<Game>();
        this.waitingRooms = new Array<WaitingRoom>();
    }

    createWaitingRoom(serverSocket : Server) : WaitingRoom | null{
        if ((this.games.length+this.waitingRooms.length)<GameFactory.NB_MAX_GAME){
            let room = new WaitingRoom(this, serverSocket);
            room.wait();
            this.waitingRooms.push(room);
            return room;
        }
        return null;
    }

    createGame(room : WaitingRoom) : Game | null{
        if (this.games.length<GameFactory.NB_MAX_GAME){
            let playersInfo = room.Players;
            let players = new Array<Player>();

            playersInfo.forEach(player => {
                players.push(new Player(player));
            })

            let board = new GameBoard();
            let game = new Game(Game.generateId(), board, players);
            this.games.push(game);
            return game;
        }
        return null;
    }
    
}
