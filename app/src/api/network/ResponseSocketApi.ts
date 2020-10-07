
export default class ResponseSocketApi {
    private res: any;
    private status: boolean;
    private msg: string;

    constructor(res : any, status : boolean, msg : string) {
        this.res = res;
        this.status = status;
        this.msg = msg;
    }

    get Result(){
        return this.res;
    }

    get Status(){
        return this.status;
    }

    get Message(){
        return this.msg;
    }

}
