import React, {Component} from "react";
import logo from "../image/Banner-1000x500.png";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class SignInView extends Component<any,any>{

    render(): React.ReactNode {


        return (
            <div style={{textAlign:"center"}}>
                <img src={logo} width={600} alt="logo"/>

                <Form style={{width:"500px", textAlign:"left", margin:"auto auto", padding:"20px", borderRadius:10, color:"white"}} className="bg-dark">

                    <Form.Group controlId="formBasicEmail">
                        <Form.Text style={{fontSize:"30px", fontFamily:"Gameplay",textAlign:"center"}}>
                            Sign In
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remmember this pc for 7 days" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    <Link className="nav-link" to="/Signup">I need an account</Link>
                </Form>
            </div>
        );
    }
}
