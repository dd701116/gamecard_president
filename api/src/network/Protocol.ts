import {Request, Response} from "express";
import CardService, {PictureType} from "../service/CardService";
import PlayerService from "../service/PlayerService";
import GameFactory from "../service/GameFactory";


export class ExpressRoute{

    static test(req : Request<any>, res : Response<any>) : void{
        res.send("<h1>Server is UP !</h1>");
    }

    static signin(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{

    }

    static signup(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{

    }

    static player(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{

    }

    static playerPicture(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{

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

    }

    static readyToPlay(service : GameFactory, data : any) : void{

    }

    static play(service : GameFactory, data : any) : void{

    }

    static chat(service : GameFactory, data : any) : void{

    }

    static invitePlayer(service : GameFactory, data : any) : void{

    }

    static leave(service : GameFactory, data : any) : void{

    }

}
