

export default class Strike {

    private reason : string;
    private timestamp : number;
    private enable : boolean;

    constructor(reason : string, timestamp : number, enable : boolean) {
        this.reason = reason;
        this.timestamp = timestamp;
        this.enable = enable;
    }

    get Enable(){
        return this.enable;
    }

}
