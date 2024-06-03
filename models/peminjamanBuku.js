import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import buku from "./bukuModel.js";
import peminjaman from "./peminjamanModel.js";


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

buku.belongsToMany(peminjaman,{
    through:peminjamanBuku,
    primaryKey:'id_buku',
    otherKey:'id_peminjaman',
    as: 'peminjamans'
})

peminjaman.belongsToMany(buku,{
    through: peminjamanBuku,
    foreignKey: "id_peminjaman",
    otherKey:'id_buku',
    as:'Bukus'
});
export default peminjamanBuku;

(async()=>{
    await db.sync();
})()