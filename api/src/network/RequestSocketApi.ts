import PlayerInfo from "../item/PlayerInfo";
import GameInfo from "../item/GameInfo";
import Card from "../item/Card";

export type JoinGame = {
    player : PlayerInfo,
    game : GameInfo
}

export type ReadyToPlay = {
    player : PlayerInfo,
    game : GameInfo
}

export type Play = {
    player : PlayerInfo,
    game : GameInfo,
    cards : Array<Card>
}

export type Invite = {
    game : GameInfo,
    player : PlayerInfo,
    target : PlayerInfo
}

export type Leave = {
    player : PlayerInfo,
    game : GameInfo
}

export type Chat = {
    player : PlayerInfo,
    game : GameInfo,
    message : string
}
