import React, {Component} from "react";
import Player from "../component/Player";
import {ExpressRoute} from "../api/network/Protocol";

export default class HomeView extends Component<HomeViewProps,HomeViewState>{

    constructor(props : HomeViewProps) {
        super(props);
        this.state = {
            player : null,
            message : ""
        }

        ExpressRoute.test().then((data) => {
            this.setState({message:data.message});
        },(err) => {
            console.log("render");
        });
    }

    render(): React.ReactNode {



        console.log("render");

        return (
            <div>
                {this.state.message}
            </div>
        );
    }

}

type HomeViewProps = {

}

type HomeViewState = {
    player : Player | null,
    message : string
}
