import encoder from '@ygoe/msgpack'

class WSChat {

    constructor(uid, token) {
        this.creds = {
            uid,
            token
        }
        this.ws = new WebSocket(`ws://localhost:8043/ws?token=${token}`);

        this.connect()
    }

    connect() {
        this.ws.addEventListener("open", () => {
            console.log("connected to server")
            // this.send("auth", this.creds)
        })
    }


    send(event, data){
        this.ws.send(`${event}|${JSON.stringify(data)}`)
    }

}

export default WSChat