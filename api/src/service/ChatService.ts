import AbstractService from "./AbstractService";
import Chat from "../item/Chat";


export default class ChatService extends AbstractService<Chat>{

    add(element: Chat): void {
    }

    delete(element: Chat): void {
    }

    get(filter: any): Promise<Chat> {
        return new Promise<Chat>();
    }

    update(element: Chat): void {
    }
    
}
