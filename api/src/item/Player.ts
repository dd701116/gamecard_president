import Card from "./Card";
import PlayerInfo from "./PlayerInfo";
import GameBoard from "./GameBoard";


export default class Player {

    private info : PlayerInfo;
    private hands : Array<Card>;

    constructor(info : PlayerInfo, cards : Array<Card>) {
        this.info = info;
        this.hands = new Array<Card>();
        cards.forEach(card => this.hands.push(card));
    }

    get Info() : PlayerInfo{
        return this.info;
    }

    get Hands() : Array<Card>{
        return this.hands;
    }

    public play(cards : Array<Card>, board : GameBoard){

        let result = new Array<Card>();
        let indexes = new Array<number>();
        let index = -1;

        //  On verifie que la carte est bien entre les mains du joueur
        cards.forEach(extCard => {
            index = this.hands.findIndex(card => card.equals(extCard));
            if (index!==-1){
                result.push(extCard);
                indexes.push(index);
            }
        });
        //  On lui enleve les cartes qu'il vient de jouer
        indexes.forEach(i => this.hands.splice(i,1));
        //  On place les cartes sur le plateau
        board.play(result);
    }

    equals(player : Player) : boolean{
        return this.info.equals(player.Info);
    }
    
}
