import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import rak from "./rakModel.js";
import kategori from "./kategoriModel.js";


const {DataTypes} = Sequelize;

const buku = db.define('buku',{
    id_buku:{
        type:DataTypes.STRING,
        primaryKey:true
    },

    isbn:{
        type:DataTypes.STRING,
        allowNull:false
    },
    judul:{
        type:DataTypes.STRING,
        allowNull:false
    },
    penulis:{
        type:DataTypes.STRING,
        allowNull:false
    },
    penerbit:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tahun:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jumlah:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    foto_sampul:{
        type:DataTypes.STRING,
        allowNull:true
    },
    foto_lampiran:{
        type:DataTypes.STRING,
        allowNull:true
    },
    keterangan:{
        type:DataTypes.STRING,
        allowNull:true
    },
},{
    tableName:"buku",
    freezeTableName:true,
    underscored:true
});


// relasi one to many buku dan rak

rak.hasMany(buku,{
    foreignKey: "id_rak",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});

buku.belongsTo(rak,{
    foreignKey:"id_rak",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});

// relasi one to many buku dan kategori

kategori.hasMany(buku,{
    foreignKey: "id_kategori",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});


buku.belongsTo(kategori, {
    foreignKey: "id_kategori",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});





export default buku;


(async()=>{
    await db.sync();
})();