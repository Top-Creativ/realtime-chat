import Router from "../libs/router";
import type { ServerWebSocket } from 'bun'

const AuthRoute = new Router()

AuthRoute.on("", async (ws: ServerWebSocket, data: {uid: string, token: string}) => {
    console.log("from routing")
})

export default AuthRoute