import WSChat from './websocket.js'

window.client = new WSChat("uid_eon2983", "eyJpZCI6IjAxamdjM2Z3NGhxd2tmNzh0ZXF3NXNzZjJzIiwidG9rZW4iOiI5YjYxYWQ1YjQ5ZDIxYzFhNGY5ZjQyYmQxMGJlNDQ2MSJ9")


client.ws.addEventListener("message", (e) => {
    console.log(e)
})