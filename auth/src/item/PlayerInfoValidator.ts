
export default class PlayerInfoValidator {

    static checkUsername(value:string) : boolean{
        const regexUsername = /[A-z]/i;
        const minLengthUsername = 3;
        const maxLengthUsername = 20;

        return value.match(regexUsername)!=null && value.length>minLengthUsername && value.length<maxLengthUsername;

    }

    static checkEmail(value:string) : boolean{
        const regexEmail = /[a-z0-9][a-z0-9]*@[a-z][a-z]*\.[a-z][a-z]*/i;
        const minLengthEmail = 6;
        const maxLengthEmail = 100;

        return value.match(regexEmail)!=null && value.length>minLengthEmail && value.length<maxLengthEmail;

    }


    static checkPassword(value:string) : boolean{
        const regexPassword = /[A-z0-9]*/;
        const minLengthPassword = 5;
        const maxLengthPassword = 30;

        return value.match(regexPassword)!=null && value.length>minLengthPassword && value.length<maxLengthPassword;

    }

    static checkContract(value:boolean) : boolean{
        return value;
    }
}