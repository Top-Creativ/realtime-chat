import {type Options, Sequelize} from 'sequelize';
import {DatabaseConfig} from "../config/database.ts";

const sequelize = new Sequelize(<Options>DatabaseConfig);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);

    process.exit(1);
}

export default sequelize;