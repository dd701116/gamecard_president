import http from "http";
import SocketIOClient from "socket.io-client";
type Socket = SocketIOClient.Socket;


export default class Api {

    static CONFIG = {
        protocol:"http",
        hostname:"localhost",
        port: ":5000",
        version:"v1"
    }

    static get(url:string) : Promise<any> {
        return new Promise((resolve, reject) => {
            http.get(url, res => {
                const { statusCode } = res;
                //const contentType = res.headers['content-type'];

                let error;
                // Any 2xx status code signals a successful response but
                // here we're only checking for 200.
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }

                if (error) {
                    reject(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (e) {
                        reject(e.message);
                    }
                });
            }).on('error', (e) => {
                reject(`Got error: ${e.message}`);
            });
        });
    }

    static emit(socket : Socket, protocole:string,  data: object){
        socket.emit(protocole,data);
    }

    static on(socket : Socket, protocole : string, callback:Function){
        socket.on(protocole, (data : {res:any, msg:string, status:boolean}) =>{

            if (data.status){
                callback(data.res);
            }else{
                console.error(data.msg);
            }

        });
    }

}
