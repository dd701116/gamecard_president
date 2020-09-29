import Card, {CardSymbol} from "./Card";


export default class GameBoard {

    private heap : Array<Array<Card>>;

    constructor() {
        this.heap = new Array<Array<Card>>();
    }

    public play(cards : Array<Card>) : void{
        this.heap.push(cards);
    }

    public undo() : Array<Card> | undefined{
        return this.heap.pop();
    }

    public clean() : void{
        this.heap = new Array<Array<Card>>();
    }

    get Head(){
        if (this.heap.length>0){
            return this.heap[this.heap.length-1];
        }else{
            return new Array<Card>();
        }
    }
}
