
export default class Card {

    private readonly symbol : CardSymbol;
    private readonly value : number;
    private readonly picture : string;
    private description : string;
    private readonly id : string;

    constructor(id : string, symbol: CardSymbol, value : number, picture: string) {
        this.id = id;
        this.symbol = symbol;
        this.value = value;
        this.picture = picture;
        this.description = `(${this.id})-{${this.symbol}}[${this.value}]`;
    }

    get Symbol() : CardSymbol{
        return this.symbol;
    }

    get Value() : number{
        return this.value;
    }

    get Picture() : string{
        return this.picture;
    }

    equals(card : Card) : boolean{
        return (card.symbol===this.symbol) && (card.value===this.value) && (card.picture===this.picture);
    }

    compareTo(card : Card) : number{
        return this.value-card.value;
    }

    clone() : Card{
        return new Card(this.id, this.symbol, this.value, this.picture);
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
