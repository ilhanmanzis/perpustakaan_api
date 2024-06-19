import mahasiswa from "../../models/mahasiswaModel.js";
import { nanoid } from "nanoid";
import path from "path";
import uploadImage from "../../services/uploadImage.js";

const createMahasiswa = async(req,res)=>{
    const {nim, name, prodi, angkatan, email, noTelpon, jenisKelamin, tempatLahir, tanggalLahir, address} = req.body;

     // validasi name
     if(name===null || name===undefined || name==="") return res.status(400).json({
        message:"Name is required"
    });

    // validasi nim
    if(nim===null || nim===undefined || nim==="") return res.status(400).json({
        message:"nim is required"
    });

    if(isNaN(nim)) return res.status(400).json({
        message:"nim is Integer"
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

     // validasi image
     if(!req.files || !req.files.image) return res.status(400).json({
        message:"no file upload"
    });

    // mengecek nim mahasiswa 
    const data = await mahasiswa.findOne({
        where:{
            nim:nim
        }
    });

    if(data) return res.status(400).json({
        message:"nim already exists"
    });

    // membuat id
    const id = nanoid(16);
  

    try {  
        const image = await uploadImage(req.files.image, 'mahasiswa', req);
        await mahasiswa.create({
            id_mahasiswa:id,
            nim:nim, 
            name:name, 
            prodi:prodi, 
            angkatan:angkatan, 
            email:email, 
            no_telpon:noTelpon, 
            jenis_kelamin:jenisKelamin, 
            tempat_lahir:tempatLahir,
            tanggal_lahir:tanggalLahir,
            address:address,
            image:image

        });
        res.status(201).json({
            message:"mahasiswa successfuly created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
    

};

export default createMahasiswa;