import React, {Component} from "react";
import logo from "../image/Banner-1000x500.png";
import {Alert, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import PlayerInfo from "../api/item/PlayerInfo";
import {ExpressRoute} from "../api/network/Protocol";
import ApiFacade from "../api/ApiFacade";

export default class SignUpView extends Component<SignUpViewProps, SignUpViewState> {

    state = {
        username: "",
        email: "",
        password: "",
        rePassword: "",
        contract : false
    }

    validation = {
        username: false,
        email: false,
        password: false,
        rePassword: false,
        contract : false,
        submit : false,
        apiCheckEmail : null,
        apiCheckEmailWait : false,
        emailChange: false,
        success : false
    }

    emailApiTimeout : any;

    onSubmit(e:any) : void {
        e.preventDefault();

        this.validation.submit = true;

        let validation = this.state.password===this.state.rePassword && this.validation.rePassword && this.validation.password;
        validation = validation && this.validation.username && this.validation.email && this.validation.apiCheckEmail===true && this.validation.contract;

        if (validation){

            console.log("Signup !");

            ExpressRoute.signup({
                name:this.state.username,
                password:this.state.password,
                email:this.state.email,
                contract:this.state.contract
            });
            this.validation.success = true;
        }

        this.forceUpdate();

    }

    componentDidUpdate(prevProps: Readonly<SignUpViewProps>, prevState: Readonly<SignUpViewState>, snapshot?: any) {
        if (this.validation.emailChange && !this.validation.apiCheckEmailWait){
            clearTimeout(this.emailApiTimeout);
            this.validation.apiCheckEmailWait = true;
            this.emailApiTimeout = setTimeout(()=>{
                ExpressRoute.checkEmail(this.state.email).then((data)=>{
                    this.validation.apiCheckEmail = data.status;
                    this.validation.apiCheckEmailWait = false;
                    this.validation.emailChange = false;
                    this.forceUpdate();
                });
            },1000);
        }
        console.log(this.validation);
    }


    onChangeUsername(value:string){
        const regexUsername = /[A-z]/i;
        const minLengthUsername = 3;
        const maxLengthUsername = 20;

        this.validation.username = value.match(regexUsername)!=null && value.length>minLengthUsername && value.length<maxLengthUsername;

        if (this.validation.username && this.state.username!=value){
            this.setState({username:value});
        }
    }

    onChangeEmail(value:string){
        const regexEmail = /[a-z0-9][a-z0-9]*@[a-z][a-z]*\.[a-z][a-z]*/i;
        const minLengthEmail = 6;
        const maxLengthEmail = 100;

        this.validation.email = value.match(regexEmail)!=null && value.length>minLengthEmail && value.length<maxLengthEmail;

        if (this.validation.email && this.state.email!=value){
            this.setState({email:value});
            this.validation.emailChange = true;
        }
    }

    onChangePassword(value:string){
        this.validation.password = this.checkPassword(value);

        if (this.validation.password && this.state.password!=value){
            this.setState({password:value});
        }
    }

    onChangeRePassword(value:string){

        this.validation.rePassword = this.checkPassword(value);

        if (this.validation.password && this.state.rePassword!=value){
            this.setState({rePassword:value});
        }
    }

    checkPassword(value:string){
        const regexPassword = /[A-z0-9]*/;
        const minLengthPassword = 5;
        const maxLengthPassword = 30;

        return value.match(regexPassword)!=null && value.length>minLengthPassword && value.length<maxLengthPassword;

    }

    onChangeContract(value:boolean){
        this.validation.contract = value;
        this.setState({contract:value});
    }

    render(): React.ReactNode {

        return (
            <div style={{textAlign:"center"}}>
                <img src={logo} width={600} alt="logo"/>


                <Form style={{width:"500px", textAlign:"left", margin:"-10px auto", padding:"20px", borderRadius:10, color:"white"}} className="bg-dark" onSubmit={(e) => this.onSubmit(e)}>


                    {!this.validation.success?
                        <div>
                            <div className={"dd-alert"}>
                                {this.validation.submit
                                && !this.validation.username
                                && <Alert  variant={"danger"}>Invalid username, minLength : 4, maxLength : 20</Alert>}

                                {this.validation.submit
                                && !this.validation.email
                                && <Alert  variant={"danger"}>Invalid email</Alert>}

                                {this.validation.apiCheckEmail===false
                                && <Alert  variant={"warning"}>Email already used</Alert>}

                                {this.validation.submit
                                && (!this.validation.password || !this.validation.rePassword)
                                && <Alert  variant={"danger"}>Invalid password or different rePassword, minLength : 6, maxLength : 30</Alert>}

                                {this.validation.submit
                                && !this.validation.contract
                                && <Alert  variant={"danger"}>You must accept the Terms of Use and the Privacy Policy</Alert>}

                            </div>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Text style={{fontSize:"30px", fontFamily:"Gameplay",textAlign:"center"}}>
                                    Sign Up
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name={"username"} placeholder="Enter username" onChange={(e) => this.onChangeUsername(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.onChangeEmail(e.target.value)}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" style={{marginBottom:"10px"}} onChange={(e) => this.onChangePassword(e.target.value)}/>
                                <Form.Control type="password" placeholder="RePassword" onChange={(e) => this.onChangeRePassword(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I have read and I accept the Terms of Use and the Privacy Policy." onClick={() => this.onChangeContract(!this.state.contract)}/>
                            </Form.Group>

                            <Button variant="primary" type="submit" style={{marginTop:"20px", width:"100%"}}>
                                Create my account
                            </Button>

                            <Form.Group controlId="formBasicCheckbox" style={{marginTop:"10px"}}>
                                <Link to="/Signin" style={{float:"left",width:"45%"}}>I already have an account</Link> <b> | </b> <Link to={"/ThermsAndPrivacy"} style={{float:"right",width:"50%"}}>Terms of Use and Privacy Policy</Link>
                            </Form.Group>
                        </div>
                        :
                        <Form.Group controlId="formBasicEmail" style={{textAlign:"center", width:"100%"}}>
                            <Form.Text style={{fontSize:"30px", fontFamily:"Gameplay",marginBottom:"20px"}}>
                                Inscription success !
                            </Form.Text>
                            <Link to="/Signin">CONNECTION</Link>
                        </Form.Group>
                    }
                </Form>

            </div>
        );
    }
}

type SignUpViewProps = {

}

type SignUpViewState = {
    username: string,
    email: string,
    password: string,
    rePassword: string,
    contract : boolean
}
