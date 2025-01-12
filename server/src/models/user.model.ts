import {DataTypes, Model} from "sequelize";
import sequelize from "../libs/database";

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING,

    },
    {
        sequelize,
        tableName: 'users',
        deletedAt: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })

export default User