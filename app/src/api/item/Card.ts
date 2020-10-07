
export default class Card {

    private readonly symbol : CardSymbol;
    private readonly value : number;
    private readonly picture_1x : string;
    private readonly picture_4x : string;
    private description : string;
    private readonly id : string;

    constructor(id : string, symbol: CardSymbol, value : number, picture_1x: string, picture_4x: string) {
        this.id = id;
        this.symbol = symbol;
        this.value = value;
        this.picture_1x = picture_1x;
        this.picture_4x = picture_4x;
        this.description = `(${this.id})-{${this.symbol}}[${this.value}]`;
    }

    get Symbol() : CardSymbol{
        return this.symbol;
    }

    get Value() : number{
        return this.value;
    }

    get Picture1X() : string{
        return this.picture_1x;
    }

    get Picture4X() : string{
        return this.picture_4x;
    }

    equals(card : Card) : boolean{
        return (card.symbol===this.symbol) && (card.value===this.value) && (card.picture_1x===this.picture_1x) && (card.picture_4x===this.picture_4x);
    }

    compareTo(card : Card) : number{
        return this.value-card.value;
    }

    clone() : Card{
        return new Card(this.id, this.symbol, this.value, this.picture_1x, this.picture_4x);
    }

}

export enum CardSymbol{
    Heart,
    Diamond,
    Club,
    Spade,
    Joker,
    Empty
}
