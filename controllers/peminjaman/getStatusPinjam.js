import petugas from "../../models/PetugasModel.js";
import buku from "../../models/bukuModel.js";
import kategori from "../../models/kategoriModel.js";
import mahasiswa from "../../models/mahasiswaModel.js";
import peminjaman from "../../models/peminjamanModel.js";
import rak from "../../models/rakModel.js";

const getStatusPinjam = async(req,res)=>{
    try {
        const data = await peminjaman.findAll({
            where:{
                status:"pinjam"
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
    
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
};

export default getStatusPinjam;