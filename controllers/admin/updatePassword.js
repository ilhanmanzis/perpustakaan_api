import admin from "../../models/adminModel.js";
import bcrypt from "bcrypt";

const updatePasswordAdmin = async(req,res)=>{
    const {oldPassword, newPassword, confirmNewPassword}=req.body;

    // validasi oldPassword
    if(oldPassword===null || oldPassword===undefined || oldPassword==="") return res.status(400).json({
        message:"Old Password is required"
    });

    // validasi newPassword
    if(newPassword===null || newPassword===undefined || newPassword==="") return res.status(400).json({
        message:"new password is required"
    });

    // validasi confirm New Password
    if(confirmNewPassword===null || confirmNewPassword===undefined || confirmNewPassword==="") return res.status(400).json({
        message:"Confirm New Password is required"
    });

    // mencari data admin
    const data = await admin.findOne({
        where:{
            id_admin:req.params.id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

     // mengecek old Password
     const match = await bcrypt.compare(oldPassword, data.password);
     if(!match) return res.status(400).json({
         message:"old password is wrong"
     });
 
     // mengecek confirm new password
     if(newPassword!==confirmNewPassword) return res.status(400).json({
         message:"Confirm the new password must be the same"
     });
 
     // mengecek old password & new password
     if(oldPassword===newPassword) return res.status(400).json({
         message:"the new password cannot be the same as the old password"
     });
 
     // membuat hash password baru
     const salt = await bcrypt.genSalt();
     const hashPassword = await bcrypt.hash(newPassword,salt);

    //  update password admin

    try {
        await admin.update({
            password:hashPassword
        },{
            where:{
                id_admin:req.params.id
            }
        });
        res.status(201).json({
            message:"password admin successfuly updated"
        });
    } catch (error) {
        console.log(error.message);
    }

}

export default updatePasswordAdmin;