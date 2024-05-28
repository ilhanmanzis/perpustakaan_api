import admin from "../../models/adminModel.js";
import bcrypt from "bcrypt"

const updateAdmin = async(req,res)=>{
    const {id} = req.params;

    // mengecek data admin
    const data = await admin.findOne({
        where:{
            id_admin:id
        }
    });
    
    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    const {username,email, password} = req.body;

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

    const macth = await bcrypt.compare(password, data.password);
    if(!macth) return res.status(400).json({
        message:"wrong password"
    })

    // mengubah data admin
    try {
        await admin.update({
            username:username,
            email:email
        },{
            where:{
                id_admin:id
            }
        });
        res.status(201).json({
            message:"Admin successfuly updated"
        })
    } catch (error) {
        console.log(error.message);
    }
}

export default updateAdmin;