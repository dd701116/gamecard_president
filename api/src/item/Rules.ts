import Card from "./Card";
import GameBoard from "./GameBoard";
import Player from "./Player";

export default class Rules {


    static isPlayable(cards : Array<Card>, board : GameBoard) : boolean{
        return true;
    }

    static itsHisTurn(turn : number, player : Player,  players : Array<Player>) : boolean{
        return true;
    }

    static whosNext(turn : number, players : Array<Player>) : Player{
        return {};
    }

    static canPlay(player:Player, jumped:boolean) : boolean{
        return true && !jumped;
    }

    static isPresident(player : Player, players : Array<Player>) : boolean{
        return true;
    }

    static isVicePresident(player : Player, players : Array<Player>) : boolean{
        return true;
    }

    static isNeutral(player : Player, players : Array<Player>) : boolean{
        return true;
    }

    static isViceLooser(player : Player, players : Array<Player>) : boolean{
        return true;
    }

    static isLooser(player : Player, players : Array<Player>) : boolean{
        return true;
    }
}
