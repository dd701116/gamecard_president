import {Request, Response} from "express";
import CardService, {PictureType} from "../service/CardService";


export class ExpressRoute{

    static test(req : Request<any>, res : Response<any>) : void{
        res.send("<h1>Server is UP !</h1>");
    }

    static signin(req : Request<any>, res : Response<any>) : void{

    }

    static signup(req : Request<any>, res : Response<any>) : void{

    }

    static player(req : Request<any>, res : Response<any>) : void{

    }

    static playerPicture(req : Request<any>, res : Response<any>) : void{

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

    static joinGame(data : any) : void{

    }

    static readyToPlay(data : any) : void{

    }

    static play(data : any) : void{

    }

    static chat(data : any) : void{

    }

    static invitePlayer(data : any) : void{

    }

    static leave(data : any) : void{

    }

}
