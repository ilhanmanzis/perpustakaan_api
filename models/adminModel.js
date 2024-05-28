import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const admin = db.define('admin',{
    id_admin:{
        type:DataTypes.STRING,
        primaryKey:true
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
    session_token:{
        type:DataTypes.STRING,
        allowNull:true
    },
},{
    freezeTableName:true
});

export default admin;


(async()=>{
    await db.sync();
})();