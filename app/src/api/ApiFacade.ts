import http from "http";
import SocketIOClient from "socket.io-client";
import ResponseSocketApi from "./network/ResponseSocketApi";
import * as querystring from "querystring";
type Socket = SocketIOClient.Socket;


export default class ApiFacade {

    static CONFIG = {
        protocol:"http",
        hostname:"localhost",
        port: ":5000",
        port2number : 5000,
        version:"v1"
    }

    static get(url:string) : Promise<any> {
        return new Promise((resolve, reject) => {

            http.get(url, res => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                let error;
                // Any 2xx status code signals a successful response but
                // here we're only checking for 200.
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }else if (!/^application\/json/.test(<string>contentType)) {
                    error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
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

    static post(hostname : string, port : number, path : string, data : any) : Promise<any>{

        return new Promise((resolve, reject) => {
            const postData = querystring.stringify(data);

            const options = {
                hostname: hostname,
                port: port,
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = http.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

                let dataRes = "";
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    dataRes+=chunk;
                });
                res.on('end', () => {
                    resolve(dataRes);
                });
            });

            req.on('error', (e) => {
                reject(`problem with request: ${e.message}`);
            });

            // Write data to request body
            req.write(postData);
            req.end();
        });
    }

    static emit(socket : Socket, protocole:string,  data: object){
        socket.emit(protocole,data);
    }

    static on(socket : Socket, protocole : string, callback:Function){

        socket.on(protocole, (data : ResponseSocketApi) =>{

            if (data.Status){
                callback(data.Result);
            }else{
                console.error(data.Message);
            }

        });
    }

}
