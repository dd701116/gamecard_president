import React from "react";
import Player from "./Player";

export default class PlayerWidget extends Player{


    render(): React.ReactNode {
        return (
          <div className="dd-player-widget">
              <div className="dd-player-widget-content">
                  <img src={this.state.picture? this.state.picture : ""} alt=""/>
              </div>
          </div>
        );
    }
}
