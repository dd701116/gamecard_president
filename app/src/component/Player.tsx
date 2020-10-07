import React from "react";
import ApiFacade from "../api/ApiFacade";
import Card from "./Card";
import SocketIOClient from "socket.io-client";
type Socket = SocketIOClient.Socket;

export default class Player extends React.Component<PlayerProps, PlayerState>{

    constructor(props:PlayerProps) {
        super(props);

        this.state = {
            name: this.props.player.name,
            cards: new Array<Card>(),
            level:this.props.player.level,
            rank:this.props.player.rank,
            picture:this.props.player.picture,
            currentTurn:false
        }

        ApiFacade.emit(this.props.socket, "player-get-info", {
            id:this.props.player.id
        });

        ApiFacade.on(this.props.socket,`player-info`, (res:any) =>{
            this.setState({name: res.name,cards:res.cards, level:res.level, rank:res.rank, picture:res.picture});
        });
    }

    render(): React.ReactNode {

        //  Render
        return (
            <ul>
                {this.state.cards.map(card => <li key={card.props.description}>{card}</li>)}
            </ul>
        )
    }

}

export type PlayerProps = {
    player: any
    socket : Socket
}

export type PlayerState = {
    name : string,
    level : number,
    rank : number | string,
    cards : Array<Card>,
    picture: string,
    currentTurn:boolean
}
