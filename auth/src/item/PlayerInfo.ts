import Strike from "./Strike";


export default class PlayerInfo {

    static  STRIKE_NM_MAX : number = 3;

    private readonly _id : string |null;
    private name : string;
    private rank : number;
    private banned : boolean;
    private strikes : Array<Strike>;
    private password : string;
    private picture : string;
    private email : string;
    private contract: boolean;

    constructor(_id : string|null, name : string, rank : number, password : string, banned : boolean, strikes : Array<Strike>, picture : string, email : string, contract:boolean) {
        this._id = _id;
        this.name = name;
        this.rank = rank;
        this.banned = banned;
        this.strikes = strikes;
        this.password = password;
        this.picture = picture;
        this.email = email;
        this.contract = contract;
    }

    get PublicInfo(){
        return {
            id:this._id,
            name:this.name,
            rank:this.rank,
            banned:this.banned,
            picture: this.picture,
            contract: this.contract
        }
    }

    get Email(){
        return this.email;
    }

    set Name(value : string){
        this.name = value;
    }

    set Rank(value : number){
        this.rank = value;
    }

    set Password(value : string){
        this.password = value;
    }
    get Password(){
        return this.password;
    }

    ban(){
        this.banned = true;
    }

    unban(){
        this.banned = false;
    }

    addStrike(strike : Strike){

        //  On ajoute le nouveau strike
        this.strikes.push(strike);

        //  On recupere le nombre de strike actif
        let totalActiveStrike = this.strikes.filter(s => s.Enable).length;

        //  Si il est supp au max, on banni le joueur
        if (totalActiveStrike>=PlayerInfo.STRIKE_NM_MAX){
            this.ban();
        }
    }

    equals(info : PlayerInfo) : boolean{
        return (info._id===this._id) && (info.name===this.name) && (info.rank===this.rank);
    }
}