import petugas from "../../models/PetugasModel.js";
import buku from "../../models/bukuModel.js";
import kategori from "../../models/kategoriModel.js";
import mahasiswa from "../../models/mahasiswaModel.js";
import peminjaman from "../../models/peminjamanModel.js";
import rak from "../../models/rakModel.js";


const getPeminjamanById = async(req,res)=>{
    const {id} = req.params;

    try {
        // mencari data peminjaman
        const data = await peminjaman.findOne({
            where:{
                id_peminjaman:id
            },
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
                        model:peminjamanBuku,
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

        if(!data) return res.status(404).json({
            message:"Data Not Found"
        });

        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
    }
    
};

export default getPeminjamanById;