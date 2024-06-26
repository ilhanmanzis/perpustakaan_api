import petugas from "../../models/PetugasModel.js";
import buku from "../../models/bukuModel.js";
import kategori from "../../models/kategoriModel.js";
import mahasiswa from "../../models/mahasiswaModel.js";
import peminjaman from "../../models/peminjamanModel.js";
import rak from "../../models/rakModel.js";


const getPeminjaman = async(req,res)=>{
    try {
        const data = await peminjaman.findAll({
            include:[
                {
                    model:mahasiswa,
                },
                {
                    model:petugas,
                    attributes:['id_petugas','username', 'name', 'image']
                },
                {
                    model:buku,
                    as:'Bukus',
                    through:{
                        attributes:[]
                    },
                    include:[
                        {
                            model:rak
                        },
                        {
                            model:kategori
                        }
                    ]
                }
            ]
        });

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

export default getPeminjaman;