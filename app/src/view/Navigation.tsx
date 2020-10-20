import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Navigation extends Component<NavigationProps, NavigationState>{

    render(): React.ReactNode {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container" id="dd-nav-container">
                    <Link className="navbar-brand" to="/">President</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {this.props.player?
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Play">Play</Link>
                                </li>
                                <li className="nav-item">

                                    <Link className="nav-link" to="/Profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Help">Help</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Credits">Credits</Link>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Signin">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Help">Help</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Credits">Credits</Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        );
    }
}

export type NavigationProps = {
    player? : any
}

type NavigationState = {

}
