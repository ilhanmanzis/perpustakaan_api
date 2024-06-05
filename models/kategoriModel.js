import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const kategori = db.define('kategori',{
    id_kategori:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name_kategori:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    tableName:"kategori",
    freezeTableName:true,
    underscored:true
});

export default kategori;


(async()=>{
    await db.sync();
})();