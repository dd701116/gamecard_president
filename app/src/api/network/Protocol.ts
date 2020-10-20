import ApiFacade from "../ApiFacade";
import PlayerInfo from "../item/PlayerInfo";
import Card from "../item/Card";
import GameInfo from "../item/GameInfo";
import * as RequestSocketApi from "./RequestSocketApi";
import SocketIOClient from "socket.io-client";
type Socket = SocketIOClient.Socket;


export class ExpressRoute{

    static url : string = `${ApiFacade.CONFIG.protocol}://${ApiFacade.CONFIG.hostname}${ApiFacade.CONFIG.port}`;

    static test() : Promise<any>{
        return ApiFacade.get(`${ExpressRoute.url}/`);
    }

    static signin(player : PlayerInfo) : Promise<any>{
        return ApiFacade.post(ApiFacade.CONFIG.hostname, ApiFacade.CONFIG.port2number, `/${ApiFacade.CONFIG.version}/player/signin`, player);
    }

    static signup(player : {name:string, email:string, password:string, contract:boolean}) : Promise<any>{
        return ApiFacade.post(ApiFacade.CONFIG.hostname, ApiFacade.CONFIG.port2number, `/${ApiFacade.CONFIG.version}/player/signup`, player);
    }

    static player(id : string) : Promise<any>{
        return ApiFacade.get(`${ExpressRoute.url}/${ApiFacade.CONFIG.version}/player/${id}`);
    }

    static playerPicture(id : string) : Promise<any>{
        return ApiFacade.get(`${ExpressRoute.url}/${ApiFacade.CONFIG.version}/player/${id}/picture`);
    }

    static cardPicture(id : string) : Promise<any>{
        return ApiFacade.get(`${ExpressRoute.url}/${ApiFacade.CONFIG.version}/card/${id}/picture`);
    }

    static checkEmail(email : string) : Promise<any>{
        return ApiFacade.post(ApiFacade.CONFIG.hostname, ApiFacade.CONFIG.port2number, `/${ApiFacade.CONFIG.version}/player/checkEmail`, {email});
    }

}

export class SocketRoute{


    static joinGame(player : PlayerInfo, game : GameInfo, socket : Socket) : void{

        let request : RequestSocketApi.JoinGame = {
            game : game,
            player : player
        }

        socket.emit(`${ApiFacade.CONFIG.version}/game/join`, request);
    }

    static readyToPlay(player : PlayerInfo, game : GameInfo, socket : Socket) : void{

        let request : RequestSocketApi.ReadyToPlay = {
            game : game,
            player : player
        }

        socket.emit(`${ApiFacade.CONFIG.version}/game/readyToPlay`, request);
    }

    static play(player : PlayerInfo, game : GameInfo, cards : Array<Card>, socket : Socket) : void{

        let request : RequestSocketApi.Play = {
            game : game,
            player : player,
            cards : cards
        }

        socket.emit(`${ApiFacade.CONFIG.version}/game/play`, request);
    }

    static chat(player : PlayerInfo, game : GameInfo, message : string, socket : Socket) : void{

        let request : RequestSocketApi.Chat = {
            game : game,
            player : player,
            message : message
        }

        socket.emit(`${ApiFacade.CONFIG.version}/game/chat`, request);
    }

    static invitePlayer(player : PlayerInfo, game : GameInfo, target : PlayerInfo, socket : Socket) : void{

        let request : RequestSocketApi.Invite = {
            game : game,
            player : player,
            target : target
        }

        socket.emit(`${ApiFacade.CONFIG.version}/game/invite`, request);
    }

    static leave(player : PlayerInfo, game : GameInfo,socket : Socket) : void{

        let request : RequestSocketApi.Leave = {
            game : game,
            player : player,
        }

        socket.emit(`${ApiFacade.CONFIG.version}/game/leave`, request);
    }

}
