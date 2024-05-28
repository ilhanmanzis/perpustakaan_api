import admin from "../../models/adminModel.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const createAdmin = async(req,res)=>{
    
    // cek apakah admin sudah ada atau belum
    const data = await admin.findAll();
    if(data.length>0) return res.status(400).json({
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
        await admin.create({
            id_admin:id,
            username:username,
            email:email,
            password:hashPassword
        });
        res.status(201).json({
            message:"admin successfuly created"
        });
    } catch (error) {
        console.log(error.message);
    }


    
}

export default createAdmin;
