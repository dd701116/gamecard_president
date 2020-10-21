import {Request, response, Response} from "express";
import CardService, {PictureType} from "../service/CardService";
import PlayerService from "../service/PlayerService";
import GameFactory from "../service/GameFactory";
import ChatService from "../service/ChatService";
import PlayerInfo from "../item/PlayerInfo";
import Strike from "../item/Strike";
import PlayerInfoValidator from "../item/PlayerInfoValidator";


export class ExpressRoute{

    static test(req : Request<any>, res : Response<any>) : void{
        res.send({message : "Server is UP !"});
    }

    static player(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{
        console.log("[TODO] : player");
    }

    static playerPicture(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{
        console.log("[TODO] : playerPicture");
    }

    static cardPicture(service : CardService, req : Request<any>, res : Response<any>) : void{
        let file = service.picture(PictureType.X1, "PixelPlebes_1x__Update001_00.png");
        if (file){
            file.download().then(content => res.send(content[0]), err => console.log(err));
        }else{
            res.send('Error');
        }
    }

}

export class SocketRoute{

    static joinGame(service : GameFactory, data : any) : void{
        console.log("[TODO] : joinGame");
    }

    static readyToPlay(service : GameFactory, data : any) : void{
        console.log("[TODO] : readyToPlay");
    }

    static play(service : GameFactory, data : any) : void{
        console.log("[TODO] : play");
    }

    static chat(service : ChatService, data : any) : void{
        console.log("[TODO] : chat");
    }

    static invitePlayer(service : GameFactory, data : any) : void{
        console.log("[TODO] : invitePlayer");
    }

    static leave(service : GameFactory, data : any) : void{
        console.log("[TODO] : leave");
    }

}
