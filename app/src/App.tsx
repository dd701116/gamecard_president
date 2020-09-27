import React, {Component} from 'react';
import './style/App.css';
import { Link } from "react-router-dom";
import GameView from "./view/GameView";


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
            }
        }
    }

    render(): React.ReactNode {
        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Start Bootstrap</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Play" >Play</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Profile" >Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Help" >Help</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Credits" >Credits</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </nav>

                <section>
                    <div className="container">
                        <GameView player={this.state.player} game={this.state.game} />
                    </div>
                </section>
            </div>
        );
    }
}

type AppProps = {};

type AppState = {
    player: any,
    game:any,
    setPlayer (value:any) : void
}