import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import petugas from "./PetugasModel.js";
import mahasiswa from "./mahasiswaModel.js";
import buku from "./bukuModel.js";

const {DataTypes} = Sequelize;

const peminjaman = db.define('peminjaman',{
    id_peminjaman:{
        type:DataTypes.STRING,
        primaryKey:true
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


// relasi one to many petugas dan peminjaman

petugas.hasMany(peminjaman,{
    foreignKey: "id_petugas",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});

peminjaman.belongsTo(petugas,{
    foreignKey:"id_petugas",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});

// relasi one to many mahasiswa dan peminjaman

mahasiswa.hasMany(peminjaman,{
    foreignKey: "nim",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});

peminjaman.belongsTo(mahasiswa,{
    foreignKey: 'nim', 
    targetKey: 'nim' ,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});


// relasi many to many buku dan peminjaman

buku.belongsToMany(peminjaman,{
    through: "peminjaman_buku",
    primaryKey:'id_buku',
    otherKey:'id_peminjaman',
    as: 'peminjamans',
    onDelete: "CASCADE",  // Menambahkan opsi cascade pada delete
    onUpdate: "CASCADE"   // Menambahkan opsi cascade pada update
})

peminjaman.belongsToMany(buku,{
    through: "peminjaman_buku",
    foreignKey: "id_peminjaman",
    otherKey:'id_buku',
    as:'Bukus',
    onDelete: "CASCADE",  // Menambahkan opsi cascade pada delete
    onUpdate: "CASCADE"   // Menambahkan opsi cascade pada update
});

export default peminjaman;


(async()=>{
    await db.sync();
})();