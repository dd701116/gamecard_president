import PlayerInfo from "./PlayerInfo";
import Card from "./Card";

export default class GameInfo {

    private id : string;
    private players : Array<PlayerInfo>;
    private cards : Array<Card>;

    constructor(id : string, players : Array<PlayerInfo>, cards : Array<Card>) {

        this.id = id;
        this.players = players;
        this.cards = cards;

    }
}
