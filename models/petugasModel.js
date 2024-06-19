import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const petugas = db.define('petugas',{
    id_petugas:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    session_token:{
        type:DataTypes.STRING,
        allowNull:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"petugas",
    freezeTableName:true,
    underscored:true
});

export default petugas;


(async()=>{
    await db.sync();
})();