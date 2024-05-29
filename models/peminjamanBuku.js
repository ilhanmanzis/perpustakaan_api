import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const peminjamanBuku = db.define('peminjaman_buku', {
    id_peminjaman:{
        type:DataTypes.STRING,
        primaryKey:true,
        references:{
            model:'peminjaman',
            key:'id_peminjaman'
        },
    },
    id_buku:{
        type:DataTypes.STRING,
        primaryKey:true,
        references:{
            model:'buku',
            key:'id_buku'
        },   
    }
},{
    freezeTableName:true,
    timestamps:false
});

export default peminjamanBuku;

(async()=>{
    await db.sync();
})()