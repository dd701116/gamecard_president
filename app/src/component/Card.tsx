import React from "react";
import App from "../App";
import Api from "../Api";

export default class Card extends React.Component<CardProps, CardState>{

    static API = `${App.CONFIG.api.protocol}//${App.CONFIG.api.hostname}:${App.CONFIG.api.port}/${App.CONFIG.api.version}/card`;


    render(): React.ReactNode {
        return <img src={this.props.picture} alt={this.props.description} />;
    }

}


enum CardSymbol{
    Heart,
    Diamond,
    Club,
    Spade
}

type CardProps = {
    symbol : CardSymbol,
    number : number,
    picture:string,
    description:string
}

type CardState = {
    playable : boolean
}
