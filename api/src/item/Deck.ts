import Card from "./Card";
import Player from "./Player";

export default class Deck {

    private readonly cards : Array<Card>;

    constructor() {
        this.cards = new Array<Card>();
    }

    shuffle() : void{
        for (let i = 0; i < this.cards.length; i++){

            let randomNumber = Math.floor(Math.random() * this.cards.length);

            let cardClone = this.cards[i].clone();
            let randomCardClone = this.cards[randomNumber].clone();

            this.cards[i] = randomCardClone;
            this.cards[randomNumber] = cardClone;

        }
    }

    getRange(start : number, end : number){
        let res = new Array<Card>();

        for (let i = start; i < end; i++){
            res.push(this.cards[i].clone());
        }

        return res;
    }

    distribute(players : Array<Player>) : void{

        let start = 0;
        let offset = Math.floor(this.cards.length/players.length);

        players.forEach(player => {
            player.Hands = this.getRange(start, start+offset);
            start += offset;
        })

    }

    push(card : Card){
        this.cards.push(card);
    }

    clone(){
        let clone = new Deck();
        this.cards.forEach(e => clone.push(e.clone()));
        return clone;
    }
}
