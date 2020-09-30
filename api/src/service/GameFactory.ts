import Game from "../item/Game";
import WaitingRoom from "../item/WaitingRoom";
import GameBoard from "../item/GameBoard";
import Player from "../item/Player";
import {Server} from "socket.io";
import CardService from "./CardService";


export default class GameFactory {

    static NB_MAX_GAME : number = 10;

    private games : Array<Game>;
    private waitingRooms : Array<WaitingRoom>;
    private cardService : CardService;

    constructor(cardService : CardService) {
        this.games = new Array<Game>();
        this.waitingRooms = new Array<WaitingRoom>();
        this.cardService = cardService;
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

    createGame(room : WaitingRoom) : Promise<Game> | null{
        if (this.games.length<GameFactory.NB_MAX_GAME){
            let playersInfo = room.Players;
            let players = new Array<Player>();

            playersInfo.forEach(player => {
                players.push(new Player(player));
            })

            let board = new GameBoard();

            return new Promise<Game>(((resolve, reject) => {

                this.cardService.deck().then(deck => {
                    let game = new Game(Game.generateId(), board, players, deck);
                    this.games.push(game);
                    resolve(game);
                },reject);

            }));
        }
        return null;
    }
    
}
