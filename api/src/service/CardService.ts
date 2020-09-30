import Card from "../item/Card";
import AbstractService from "./AbstractService";
import {Collection} from "mongodb";
import FirebaseFacade from "./FirebaseFacade";
import Deck from "../item/Deck";


export default class CardService extends AbstractService<Card>{


    add(element: Card): void {
    }

    delete(element: Card): void {
    }

    deck() : Promise<Deck>{

        return new Promise<Deck>((resolve, reject) => {
            let deck = new Deck();

            //  On recupere la collection mongodb dans les source
            let source_mongodb = this.Source("mongodb");
            let collection = source_mongodb?.ressource;
            //  On recupere le cursor
            let cursor = (<Collection>collection).find({value:{$gt:0}});

            cursor.toArray().then(documents => {
                documents.forEach( document => deck.push(new Card(document._id, document.symbol, document.value, document.picture_1x, document.picture_4x)));
                resolve(deck);
            }, reject);
        });
    }

    get(filter: {symbol : string, value : number}): Promise<Card> {

        return new Promise<Card>((resolve, reject) => {
            //  On recupere la collection mongodb dans les source
            let source_mongodb = this.Source("mongodb");
            let collection = source_mongodb?.ressource;
            //  On recupere les info de la carte
            (<Collection>collection).findOne(filter)
                .then((document) =>{
                    if (document){
                        resolve(new Card(document._id, document.symbol, document.value, document.picture_1x, document.picture_4x));
                    }else{
                        reject(new Error("The document is null"));
                    }
                }, (err)=>{
                    reject(err);
                });
        });
    }

    picture(type : PictureType, name : string){

        //  On recupere le bucket dans les source
        let firebase = this.Source("firebase")?.ressource;

        if (firebase && firebase instanceof FirebaseFacade){
            return (<FirebaseFacade>firebase).bucket().file(`card/${type}/${name}`);
        }

        return null;
    }

    update(element: Card): void {

    }

}

export enum PictureType{
    X1 = "1X",
    X4 = "4X"
}
