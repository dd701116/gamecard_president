
import firebase from "firebase-admin";
import path from "path";


export default class FirebaseFacade{
    private databaseURL: string;
    private credential: any;

    constructor(credential : string, databaseURL : string) {
        this.credential = require(path.resolve(__dirname,`../${credential}`));
        this.databaseURL = databaseURL;
    }

    init(){
        firebase.initializeApp({
            credential: firebase.credential.cert(this.credential),
            databaseURL: this.databaseURL
        });
    }

    bucket(){
        return firebase.storage().bucket(this.databaseURL);
    }
}
