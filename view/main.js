import WSChat from './websocket.js'

window.client = new WSChat("uid_eon2983", "01jgc3fw6vc85s61y37f9cmpzb")


client.ws.addEventListener("message", (e) => {
    console.log(e)
})