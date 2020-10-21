import bcrypt from 'bcrypt';
import AbstractService from "./AbstractService";
import PlayerInfo from "../item/PlayerInfo";
import {Collection} from "mongodb";
import Strike from "../item/Strike";


export default class PlayerService extends AbstractService<PlayerInfo>{

    add(element: PlayerInfo): void {

        this.emailAvailable(element.Email).then((available)=>{

            if (available){
                //  On recupere la collection mongodb dans les source
                let source_mongodb = this.Source("mongodb");
                let collection = source_mongodb?.ressource;

                //  On hash le mot de passe
                bcrypt.hash(element.Password, this.Config.bcrypt_salt_round, function(err, hash) {

                    if (err){
                        throw new Error(err.message);
                    }else{
                        //  On ecrase le mot de passe en claire par son hash
                        element.Password = hash;

                        //  On insert
                        (<Collection>collection).insertOne(element, {}, (err)=>{
                            if(err){
                                throw new Error(err.message);
                            }
                        });
                    }
                });
            }

        }).catch(console.log);
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

    public async emailAvailable(email : string) : Promise<boolean>{

        //  On recupere la collection mongodb dans les source
        let source_mongodb = this.Source("mongodb");
        let collection = (<Collection> source_mongodb?.ressource);
        //  On recupere les info de la carte
        let cursor = collection.find({email:email});

        let count : number = await collection.countDocuments({email:email});

        return count===0;
    }

    public async verifyPassword(plaintext:string, hash:string) : Promise<boolean>{

        return new Promise((resolve,reject)=>{
            // Load hash from your password DB.
            bcrypt.compare(plaintext, hash, function(err, result) {
                if (err){
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    }
    
}
