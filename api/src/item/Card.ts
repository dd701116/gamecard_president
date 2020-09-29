
export default class Card {

    private symbol : CardSymbol;
    private value : number;
    private picture : string;

    constructor(symbol: CardSymbol, value : number, picture: string) {
        this.symbol = symbol;
        this.value = value;
        this.picture = picture;
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
        return new Card(this.symbol, this.value, this.picture);
    }

}

export enum CardSymbol{
    Heart,
    Diamond,
    Club,
    Spade,
    Empty
}
