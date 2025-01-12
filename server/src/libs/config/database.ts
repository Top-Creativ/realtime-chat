import {GetEnv} from "../common/helper.ts";
import type {Options} from "sequelize";


export const DatabaseConfig = <Options>{
    dialect: GetEnv('DB_DIALECT', 'mariadb'),
    host: GetEnv('DB_HOST', 'localhost'),
    port: GetEnv('DB_PORT', 3306),
    database: GetEnv('DB_NAME', 'database'),
    username: GetEnv('DB_USER', 'root'),
    password: GetEnv('DB_PASS', 'password'),
}