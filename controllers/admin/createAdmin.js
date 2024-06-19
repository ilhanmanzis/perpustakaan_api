
import petugas from "../../models/PetugasModel.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const createAdmin = async(req,res)=>{
    
    // cek apakah admin sudah ada atau belum
    const data = await petugas.findOne({
        where:{
            role:'admin'
        }
    })
    if(data) return res.status(400).json({
        message:"Admin data already exists"
    });

    const {username,email,password,confirmPassword}=req.body

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

    // membuat id
    const id = nanoid(16);

    // membuat hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);

    // membuat akun admin
    try {
        await petugas.create({
             id_petugas:id,
            name:'admin',
            username:username,
            email:email,
            password:hashPassword,
            image:null,
            role:'admin'
        });
        res.status(201).json({
            message:"admin successfuly created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }


    
}

export default createAdmin;
