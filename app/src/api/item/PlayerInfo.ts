import Strike from "./Strike";


export default class PlayerInfo {

    static  STRIKE_NM_MAX : number = 3;

    private readonly id : string;
    private name : string;
    private rank : number;
    private banned : boolean;
    private strikes : Array<Strike>;
    private password : string;
    private picture : string;
    private email : string;

    constructor(id : string, name : string, rank : number, password : string, banned : boolean, strikes : Array<Strike>, picture : string, email : string) {
        this.id = id;
        this.name = name;
        this.rank = rank;
        this.banned = banned;
        this.strikes = strikes;
        this.password = password;
        this.picture = picture;
        this.email = email;
    }

    get PublicInfo(){
        return {
            id:this.id,
            name:this.name,
            rank:this.rank,
            banned:this.banned,
            picture: this.picture
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
        return (info.id===this.id) && (info.name===this.name) && (info.rank===this.rank);
    }
}
