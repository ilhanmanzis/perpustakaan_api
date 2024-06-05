import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const rak = db.define('rak',{
    id_rak:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    nomor_rak:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    name_rak:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    tableName:"rak",
    freezeTableName:true,
    underscored:true
});

export default rak;


(async()=>{
    await db.sync();
})();