import sequelize from "./libs/database";
import Router from "./libs/router";
import AuthRoute from "./routes/auth.route.ts";
import type {ServerWebSocket} from "bun";
import User from "./models/user.model.ts";
import {generateRandomString, GetEnv} from "./libs/common/helper.ts";

const app = new Router();

app.use("auth", AuthRoute)


interface WSType extends ServerWebSocket<{authToken: string}> {
    user?: User;
    stores: Map<string, any>,
    error: (message: string) => void,
    id: string;
}

// @ts-ignore
const server = Bun.serve<{authToken: string}>({
    port: 8043,
    fetch(req: Request, server) {
        const url = new URL(req.url);
        const token = url.searchParams.get("token") ?? "null";

        switch (url.pathname.substring(1)){
            case 'ws':
                if(server.upgrade(req, {
                    data: { authToken: token },
                })){
                    console.log("Upgraded to websocket");
                    return;
                }

                return new Response("None your business here !", { status: 403 });
                break;
            default:
                return new Response("Not Found", { status: 404 });
        }


    },
    websocket: {
        open: async (ws: WSType) => {
            ws.id = generateRandomString(16);
            console.log(`New connection: ${ws.id}`);
            ws.error = (message: string) => {
                ws.sendText(`error|${message}`, true);
            }

            const user = await User.findOne({
                where: {
                    id: ws.data.authToken
                },
            })

            if(!user){
                ws.error("Invalid token");
                ws.close();
                return;
            }

            if(GetEnv("APP_ENV", "production") != "production"){
                ws.sendText("user|" + JSON.stringify(user), true);
            }

            ws.user = user
        },
        message: async (ws: WSType, message: string) => {
            console.log(`Received: ${message}`);
            const [namespace, ...rest] = message.split('|');
            if(!namespace){
                ws.error("Namespace not found.");
                return;
            }

            let data;
            try {
                data = JSON.parse(rest.join('|'));
            }catch (e){
                ws.error("Invalid data format");
                return;
            }

            console.log(`Routing to ns:"${namespace}" payload:${JSON.stringify(data)}`)
            const route = app.routes.get(namespace);
            if (!route) {
                ws.error("Route not found.");
                return;
            }

            try {
                route(ws, data);
            } catch (e) {
                console.error(e);
            }

        }
    }
});
console.log("Server started at port 8043");