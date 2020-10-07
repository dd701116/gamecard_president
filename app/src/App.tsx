import React, {Component} from 'react';
import './style/App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Navigation from "./component/Navigation";
import AppRoute from "./AppRoute";


export default class App extends Component<AppProps, AppState>{

    constructor(props : any) {
        super(props);
        this.state = {
            player:{
                id : "1",
                name : "Test",
                rank : 1
            },
            game:{
                id:"1",
                players:[]
            },
            setPlayer(value: any): void {
                for (let key in value){
                    this.player[key] = value[key];
                }
            },
            hideNav:false
        }
    }


    render(): React.ReactNode {
        return (
            <div className="App">

                <Router>
                    <Navigation/>
                    <Route path="/" exact component={AppRoute.Index} />
                    <Route path="/Play" exact component={AppRoute.Play} />
                    <Route path="/Profile/:id" component={AppRoute.Profile} />
                    <Route path="/Help" exact component={AppRoute.Help} />
                    <Route path="/Credits" exact component={AppRoute.Credits} />
                </Router>

            </div>
        );
    }
}

type AppProps = {};

type AppState = {
    player: any,
    game:any,
    setPlayer (value:any) : void,
    hideNav:boolean
}
