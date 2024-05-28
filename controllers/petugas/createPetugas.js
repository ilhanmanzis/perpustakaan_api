import petugas from "../../models/PetugasModel.js";
import {nanoid} from "nanoid";
import path from "path";
import bcrypt from "bcrypt";
import uploadImage from "../../services/uploadImage.js";


const createPetugas = async(req,res)=>{
    const {name, username, email, password, confirmPassword} = req.body;
    // validasi name
    if(name===null || name===undefined || name==="") return res.status(400).json({
        message:"Name is required"
    });

    // validasi username
    if(username===null || username===undefined || username==="") return res.status(400).json({
        message:"username is required"
    });

    // validasi email
    if(email===null || email===undefined || email==="") return res.status(400).json({
        message:"email is required"
    });
    
    // validasi password
    if(password===null || password===undefined || password==="") return res.status(400).json({
        message:"password is required"
    });

    if(password!==confirmPassword) return res.status(400).json({
        message:"Confirm the password must be the same"
    });

    // validasi image
    if(req.files===null) return res.status(400).json({
        message:"no file upload"
    });

    // mengecek apakah username sudah tersedia atau belum
    const data  = await petugas.findOne({
        where:{
            username:username
        }
    });

    if(data) return res.status(400).json({
        message:"username already exists"
    });

    // membuat id petugas
    const id = nanoid(16);

    // membuat hash password

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);

    
    try {
        // upload image ke server
        const image = await uploadImage(req.files.image, 'petugas', req);

        // upload file ke server
        await petugas.create({
            id_petugas:id,
            name:name,
            username:username,
            email:email,
            password:hashPassword,
            image:image
        });
        res.status(201).json({
            message:"petugas successfuly created"
        })
    } catch (error) {
        console.log(error.message);
    }

}


export default createPetugas;