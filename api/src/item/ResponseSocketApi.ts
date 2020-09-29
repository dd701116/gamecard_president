
export default class ResponseSocketApi {
    private res;
    private status;
    private msg;

    constructor(res : any, status : boolean, msg : string) {
        this.res = res;
        this.status = status;
        this.msg = msg;
    }

}
