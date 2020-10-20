
export default class ResponseSocketApi {
    private res: any;
    private status: boolean;
    private msg: string;

    constructor(res : any, status : boolean, msg : string) {
        this.res = res;
        this.status = status;
        this.msg = msg;
    }

}
