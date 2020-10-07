import { BrowserRouter as Router, Route } from "react-router-dom";
import React, {FunctionComponent} from "react";
import App from "./App";
import HomeView from "./view/HomeView";
import GameBoard from "./component/GameBoard";

export default class AppRoute{


    static Index : FunctionComponent = () : any => {
        return (
            <section className="dd-content">
                <div className="dd-content-container">
                    <HomeView/>
                </div>
            </section>
        );
    }

    static Play : FunctionComponent = () : any => {
        return (
            <section className="dd-content">
                <div className="dd-content-container">
                    Play
                </div>
            </section>
        );
    }

    static Profile : FunctionComponent = (match) : any => {
        return (
            <section className="dd-content">
                <div className="dd-content-container">
                    Profile
                </div>
            </section>
        );
    }

    static Help : FunctionComponent = () : any => {
        return (
            <section className="dd-content">
                <div className="dd-content-container">
                    Help
                </div>
            </section>
        );
    }

    static Credits : FunctionComponent = () : any => {
        return (
            <section className="dd-content">
                <div className="dd-content-container">
                    Credits
                </div>
            </section>
        );
    }
}
