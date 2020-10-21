import bcrypt from 'bcrypt';
import AbstractService from "./AbstractService";
import PlayerInfo from "../item/PlayerInfo";
import {Collection} from "mongodb";
import Strike from "../item/Strike";


export default class PlayerService extends AbstractService<PlayerInfo>{

    add(element: PlayerInfo): void {


    }

    delete(element: PlayerInfo): void {
    }

    get(filter: any): Promise<PlayerInfo> {
        return new Promise<PlayerInfo>((resolve, reject) => {

            //  On recupere la collection mongodb dans les source
            let source_mongodb = this.Source("mongodb");
            let collection = source_mongodb?.ressource;
            //  On recupere les info de la carte
            (<Collection>collection).findOne(filter)
                .then((document) =>{
                    if (document){
                        let strikes : Array<Strike> = new Array<Strike>();
                        document.strikes.forEach((strike:{reason : string, timestamp : number, enable : boolean}) => strikes.push(new Strike(strike.reason, strike.timestamp, strike.enable)));
                        resolve(new PlayerInfo(document._id, document.name, document.rank, document.password, document.banned, strikes, document.picture, document.email, document.contract));
                    }else{
                        reject(new Error("The document is null"));
                    }
                }, (err)=>{
                    reject(err);
                });

        });
    }

    update(element: PlayerInfo): void {
    }

    
}
