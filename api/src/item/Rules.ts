import Card from "./Card";
import GameBoard from "./GameBoard";
import Player from "./Player";
import PlayerInfo from "./PlayerInfo";
import Strike from "./Strike";

export default class Rules {


    static isPlayable(cards : Array<Card>, board : GameBoard) : boolean{
        return true;
    }

    static itsHisTurn(turn : number, player : Player,  players : Array<Player>) : boolean{
        return true;
    }

    static whosNext(turn : number, players : Array<Player>) : Player{
        return new Player(new PlayerInfo("","",0,"",true,new Array<Strike>(), "", "",false));
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
