import React, {Component} from "react";
import Player from "../component/Player";
import {ExpressRoute} from "../api/network/Protocol";
import logo from "../image/Banner-1000x500.png";
import Animation_Examples from "../image/Animation_Examples.gif";
import Wallpaper from "../image/Wallpaper-cover-2-sansfond.png";
import {Link} from "react-router-dom";

export default class HomeView extends Component<HomeViewProps,HomeViewState>{

    state = {
        player : null,
        message : "",
        loading : false
    }

    constructor(props : HomeViewProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({loading:true});
        ExpressRoute.test().then((data) => {
            this.setState({message:data.message, loading:false});
        },(err) => {
            console.log("render");
            this.setState({loading:false});
        });
    }

    render(): React.ReactNode {


        return (
            <div style={{textAlign:"center"}}>


                <img src={Wallpaper} width={850} style={{marginTop:"-50px"}} alt="Animation_Examples"/>
                {/*{this.state.loading ?
                    <p>Loading...</p>
                    :
                    <p>{this.state.message}</p>
                }*/}

                <div style={{marginTop:"-50px", width:"100%"}}>
                    <h2 style={{fontSize:"30px"}} >TAKE THE CHALLENGE</h2>
                    <h1 style={{fontSize:"60px", width:"100%"}}>BECOME A LEADER</h1>
                    <Link className="nav-link btn-primary" style={{width:"200px", padding:"20px", margin:"20px auto"}} to="/Signup" >PLAY FOR FREE</Link>
                </div>
            </div>
        );
    }

}

export type HomeViewProps = {

}

type HomeViewState = {
    player : Player | null,
    message : string,
    loading : boolean
}
