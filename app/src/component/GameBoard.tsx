import React, {Component} from "react";
import Card from "./Card";
import SocketIOClient from "socket.io-client";

type Socket = SocketIOClient.Socket;

export default class GameBoard extends Component<GameBoardProps, GameBoardState>{

    constructor(props : GameBoardProps) {
        super(props);
        this.state = {
            cards : new Array<Card>(4)
        }

    }



    render(): React.ReactNode {

        return (
            <ul className="dd-board-cards">{this.state.cards.map(card => <li key={card.props.description}>{card}</li>)}</ul>
        );
    }
}


type GameBoardProps = {
    gameId : string,
    socket : Socket
}

type GameBoardState = {
    cards : Array<Card>,
}
