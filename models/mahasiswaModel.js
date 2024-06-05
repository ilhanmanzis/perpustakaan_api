import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const mahasiswa = db.define('mahasiswa',{
    id_mahasiswa:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    nim:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    prodi:{
        type:DataTypes.STRING,
        allowNull:false
    },
    angkatan:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    no_telpon: {
        type:DataTypes.STRING,
        allowNull:true
    },
    jenis_kelamin:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tempat_lahir:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tanggal_lahir:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"mahasiswa",
    freezeTableName:true,
    underscored:true
});

export default mahasiswa;


(async()=>{
    await db.sync();
})();