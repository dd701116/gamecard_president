import React, {Component} from "react";
import logo from "../image/Banner-1000x500.png";
import {Alert, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ExpressRoute} from "../api/network/Protocol";

export default class SignInView extends Component<any,SignInViewState>{

    state = {
        email: "",
        password: ""
    };

    validation = {
        email: false,
        password: false,
        submit : false,
        apiCheckEmail : false,
        apiCheckEmailWait : false,
        emailChange: false,
        success : false
    };

    emailApiTimeout : any;

    onSubmit(e:any) : void {
        e.preventDefault();

        this.validation.submit = true;

        let validation = this.validation.password && this.validation.email && this.validation.apiCheckEmail===true;

        if (validation){

            console.log("Signin !");

            ExpressRoute.signin({
                email:this.state.email,
                password:this.state.password
            }).then((result)=>{
                this.validation.success = result.status;
                this.forceUpdate();
            }, (err)=>{
                console.log(err.message);
            });
        }



    }

    componentDidUpdate(prevProps: Readonly<SignInViewProps>, prevState: Readonly<SignInViewState>, snapshot?: any) {

        if (this.validation.emailChange && !this.validation.apiCheckEmailWait){
            clearTimeout(this.emailApiTimeout);
            this.validation.apiCheckEmailWait = true;
            this.emailApiTimeout = setTimeout(()=>{
                ExpressRoute.checkEmail(this.state.email).then((data : {status:boolean})=>{
                    this.validation.apiCheckEmail = !data.status;
                    this.validation.apiCheckEmailWait = false;
                    this.validation.emailChange = false;
                    this.forceUpdate();
                });
            },1000);
        }
        console.log(this.validation);
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

        this.validation.password = value!="";

        if (this.validation.password && this.state.password!=value){
            this.setState({password:value});
        }
    }



    render(): React.ReactNode {


        return (
            <div style={{textAlign:"center"}}>
                <img src={logo} width={600} alt="logo"/>

                <Form style={{width:"500px", textAlign:"left", margin:"auto auto", padding:"20px", borderRadius:10, color:"white"}} className="bg-dark" onSubmit={(e) => this.onSubmit(e)}>

                    {!this.validation.success?
                        <div>
                            <div className={"dd-alert"}>

                                {this.validation.apiCheckEmail===false && this.state.email!=""
                                && <Alert  variant={"warning"}>This email address not register !</Alert>}


                            </div>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Text style={{fontSize:"30px", fontFamily:"Gameplay",textAlign:"center"}}>
                                    Sign In
                                </Form.Text>
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
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.onChangePassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remmember this pc for 7 days" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                            <Link className="nav-link" to="/Signup">I need an account</Link>

                        </div>
                        :
                        <Form.Group controlId="formBasicEmail" style={{textAlign:"center", width:"100%"}}>
                            <Form.Text style={{fontSize:"30px", fontFamily:"Gameplay",marginBottom:"20px"}}>
                                Connection success !
                            </Form.Text>
                            <Link to="/">Dashboard</Link>
                        </Form.Group> }
                </Form>
            </div>
        );
    }
}


type SignInViewProps = {

}


type SignInViewState = {
    email: string,
    password: string
}