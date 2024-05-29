import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import petugas from "./PetugasModel.js";
import buku from "./bukuModel.js";
import mahasiswa from "./mahasiswaModel.js";
import peminjamanBuku from "./peminjamanBuku.js";

const {DataTypes} = Sequelize;

const peminjaman = db.define('peminjaman',{
    id_peminjaman:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    id_petugas:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model: petugas,
            key:"id_petugas"
        }
    },
    nim:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:mahasiswa,
            key:"nim"
        }
    },

    tanggal_pinjam:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jumlah_hari:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tanggal_pengembalian:{
        type:DataTypes.STRING,
        allowNull:true
    },
    batas_pengembalian:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    denda:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    keterangan:{
        type:DataTypes.STRING,
        allowNull:true
    },
},{
    freezeTableName:true
});

peminjaman.belongsTo(petugas,{
    foreignKey:"id_petugas"
});
peminjaman.belongsTo(mahasiswa,{
    foreignKey: 'nim', 
    targetKey: 'nim' 
});
peminjaman.belongsToMany(buku,{
    through:peminjamanBuku,
    foreignKey:"id_peminjaman",
    otherKey:'id_buku',
    as:'Bukus'
});

export default peminjaman;


(async()=>{
    await db.sync();
})();