import {Request, response, Response} from "express";
import PlayerService from "../service/PlayerService";
import PlayerInfo from "../item/PlayerInfo";
import Strike from "../item/Strike";
import PlayerInfoValidator from "../item/PlayerInfoValidator";


export class ExpressRoute{

    static test(req : Request<any>, res : Response<any>) : void{
        res.send({message : "Server is UP !"});
    }

    static signin(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{
        console.log("[TODO] : signin");
    }

    static signup(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{

        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;
        const contract = req.body.contract;

        if (PlayerInfoValidator.checkUsername(name) && PlayerInfoValidator.checkPassword(password) && PlayerInfoValidator.checkEmail(email) && PlayerInfoValidator.checkContract(contract)){
            let player : PlayerInfo = new PlayerInfo(null, name, 0, password, false, new Array<Strike>(), "048-tower.png", email, contract);

            service?.add(player);

            res.send({
                status : true
            });
        }else{
            res.send({
                status : false
            });
        }

    }

    static checkEmail(service : PlayerService | undefined, req : Request<any>, res : Response<any>) : void{
        const email = req.body.email;
        console.log(email);
        service?.emailAvailable(email).then((response)=>{
            res.send({
                status : response && PlayerInfoValidator.checkEmail(email)
            });
        }, (err) => {
            res.send({
                status : false,
                message : err.message
            });
        });
    }


}
