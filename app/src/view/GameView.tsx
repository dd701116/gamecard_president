import React, {Component} from "react";
import GameBoard from "../component/GameBoard";
import SocketIOClient from "socket.io-client";
import ApiFacade from "../api/ApiFacade";
import io from "socket.io-client";
import Chat from "../component/Chat";
import Card from "../component/Card";
import PlayerWidget from "../component/PlayerWidget";
import Player from "../component/Player";
type Socket = SocketIOClient.Socket;

export default class GameView extends Component<GameViewProps, GameViewState>{

    state = {
        time:"00:00",
        cooldown:30

    }
    constructor(props : GameViewProps) {
        super(props);

        let socket : Socket = io.connect(`${ApiFacade.CONFIG.protocol}://${ApiFacade.CONFIG.hostname}${ApiFacade.CONFIG.port}`);


    }
    static getOpponents(players : Array<any>, socket : Socket) : any{
        return players.map( (player:any) => new PlayerWidget({player:player, socket:socket}));
    }

    static getCards(cards : any) : any{
        return cards.map((card:any) => new Card({symbol:card.symbol, number:card.number, description:card.description, picture:card.picture}));
    }

    render(): React.ReactNode {

        return (
            <div className="dd-board">
                <div className="dd-board-top">
                    <ul className="dd-board-opponents">
                        {GameView.getOpponents(this.props.game.players, this.props.socket)}
                    </ul>
                    <div className="dd-board-player-widget">
                        <PlayerWidget player={this.props.player} socket={this.props.socket}/>
                    </div>
                    <GameBoard gameId={this.props.game.id} socket={this.props.socket} />
                </div>
                <div className="dd-board-bottom">
                    <Chat socket={this.props.socket} author={this.props.player.name} />
                    <div className="dd-board-player">
                        <Player player={this.props.player} socket={this.props.socket} />
                    </div>
                    <ul className="dd-board-button">
                        <p className="dd-board-cooldown">{this.state.cooldown}s</p>
                        <button>End Turn</button>
                    </ul>
                </div>
            </div>
        );
    }
}

type GameViewProps = {
    player: any,
    game: any,
    socket : Socket //  TODO : choose if its class will create the socket or not
}

type GameViewState = {
    time:string,
    cooldown:number,
}
