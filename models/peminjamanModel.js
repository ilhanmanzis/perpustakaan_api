import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import petugas from "./PetugasModel.js";
import buku from "./bukuModel.js";
import mahasiswa from "./mahasiswaModel.js";

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
    id_buku:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:buku,
            key:"id_buku"
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
peminjaman.belongsTo(buku,{
    foreignKey:"id_buku"
});

export default peminjaman;


(async()=>{
    await db.sync();
})();