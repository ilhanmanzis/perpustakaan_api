import mahasiswa from "../../models/mahasiswaModel.js";
import path from "path";
import fs from "fs";
import updateImage from "../../services/updateImage.js";

const updateMahasiswa = async(req,res)=>{
    const {id} = req.params;

    // mencari data mahasiswa berdasarkan id
    const data = await mahasiswa.findOne({
        where:{
            id_mahasiswa:id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    const {name, prodi, angkatan, email, noTelpon, jenisKelamin, tempatLahir, tanggalLahir, address} = req.body;

     // validasi name
     if(name===null || name===undefined || name==="") return res.status(400).json({
        message:"Name is required"
    });

    // validasi prodi
    if(prodi===null || prodi===undefined || prodi==="") return res.status(400).json({
        message:"prodi is required"
    });

    // validasi angkatan
    if(angkatan===null || angkatan===undefined || angkatan==="") return res.status(400).json({
        message:"angkatan is required"
    });

    // validasi jenis kelamin
    if(jenisKelamin===null || jenisKelamin===undefined || jenisKelamin==="") return res.status(400).json({
        message:"jenis kelamin is required"
    });

    // validasi tempat lahir
    if(tempatLahir===null || tempatLahir===undefined || tempatLahir==="") return res.status(400).json({
        message:"tempat lahir is required"
    });

    // validasi tanggal lahir
    if(tanggalLahir===null || tanggalLahir===undefined || tanggalLahir==="") return res.status(400).json({
        message:"tanggal lahir is required"
    });

    // validasi address
    if(address===null || address===undefined || address==="") return res.status(400).json({
        message:"address is required"
    });


    let url = data.image;

    if(req.files && req.files.image){
        url = await updateImage(req.files.image, 'mahasiswa', req, data.image);

    }

    // update data mahasisiswa
    try {
        await mahasiswa.update({ 
            name:name, 
            prodi:prodi, 
            angkatan:angkatan, 
            email:email, 
            no_telpon:noTelpon, 
            jenis_kelamin:jenisKelamin, 
            tempat_lahir:tempatLahir,
            tanggal_lahir:tanggalLahir,
            address:address,
            image:url
        },{
            where:{
                id_mahasiswa:id
            }
        });
        res.status(201).json({
            message:"Mahasiswa successfuly updated"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

export default updateMahasiswa;