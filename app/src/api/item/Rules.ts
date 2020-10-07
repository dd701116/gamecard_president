import Card from "./Card";
import PlayerInfo from "./PlayerInfo";
import Strike from "./Strike";

export default class Rules {


    static isPlayable(cards : Array<Card>, board : Array<Card>) : boolean{
        return true;
    }

    static itsMyTurn(turn : number) : boolean{
        return true;
    }
}
