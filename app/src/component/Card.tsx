import React from "react";

export default class Card extends React.Component<CardProps, CardState>{



    render(): React.ReactNode {
        return <img src={this.props.picture} alt={this.props.description} />;
    }

}


export enum CardSymbol{
    Heart,
    Diamond,
    Club,
    Spade,
    Empty
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
