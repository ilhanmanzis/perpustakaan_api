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
    id_rak:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model: rak,
            key: "id_rak"
        }
    },
    id_kategori:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:kategori,
            key:"id_kategori"
        }
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
    freezeTableName:true
});

buku.belongsTo(kategori, {
    foreignKey: "id_kategori"
});

buku.belongsTo(rak,{
    foreignKey:"id_rak"
});

export default buku;


(async()=>{
    await db.sync();
})();