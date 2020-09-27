import { BrowserRouter as Router, Route } from "react-router-dom";
import React, {Component, FunctionComponent} from "react";
import App from "./App";

export default class AppRoute extends Component<any, any>{


    static Index : FunctionComponent = () : any => {
        return (
            <App/>
        );
    }

    static Play : FunctionComponent = () : any => {

    }

    static Profile : FunctionComponent = (match) : any => {

    }

    static Help : FunctionComponent = () : any => {

    }

    static Credits : FunctionComponent = () : any => {

    }

    render(): React.ReactNode {
        return (
            <Router>
                <App/>
                <Route path="/Play" exact component={AppRoute.Play} />
                <Route path="/Profile/:id" component={AppRoute.Profile} />
                <Route path="/Help" exact component={AppRoute.Help} />
                <Route path="/Credits" exact component={AppRoute.Credits} />
            </Router>
        );
    }


}
