import React, {Component} from "react";
import Api from "../Api";
import SocketIOClient from "socket.io-client";
type Socket = SocketIOClient.Socket;

export default class Chat extends Component<ChatProps, ChatState>{

    constructor(props : ChatProps) {
        super(props);

        this.state = {
            messages : new Array<{author:string, content:string, timestamp:number}>(),
            input: ""

        }

        Api.on(this.props.socket, "chat-get-message", (data:{author:string, content:string, timestamp:number})=>{
            const messages = this.state.messages.slice();
            messages.push({author:data.author, content: data.content, timestamp: data.timestamp});
            this.setState({messages:messages});
        });

    }

    keyPress(event:React.KeyboardEvent){
        if ((event.key === "Enter" || event.keyCode === 13) && this.props.socket) {
            Api.emit(this.props.socket, "chat-post-message", {
                author:this.props.author,
                message:this.state.input
            });
        }
    }

    render(): React.ReactNode {
        return (
            <div className="dd-chat">
                <ul className="dd-chat-screen">
                    {this.state.messages.map((message:{author:string, content:string, timestamp:number}) => <li key={message.timestamp.toString()}>[{message.author}] {message.content}</li>)}
                </ul>
                <input type="text" className="dd-chat-input" onChange={(event)=>this.setState({input:event.target.value})} onKeyUp={this.keyPress} />
            </div>
        );
    }
}

type ChatProps = {
    socket:Socket,
    author:string
}

type ChatState = {
    messages : Array<{author:string, content:string, timestamp:number}>,
    input:string
}
