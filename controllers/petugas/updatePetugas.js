import petugas from "../../models/PetugasModel.js";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt"

const updatePetugas = async(req,res)=>{
    const {id} = req.params;

    // mencari data petugas berdasarkan id
    const response = await petugas.findOne({
        where:{
            id_petugas:id
        }
    });

    if(response.role==='admin'){   
        res.status(400).json({
            message:"Admin data cannot be changed, except for the password"
        })
    }

    if(!response) return res.status(404).json({
        message:"Data not found"
    });

    const {name, username, email, password} = req.body;

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

    const macth = await bcrypt.compare(password, response.password);
    if(!macth) return res.status(400).json({
        message:"wrong password"
    })


    let url = response.image;


    if(req.files && req.files.image){
        // update foto petugas
        url = await updateImage(req.files.image, 'petugas', req, url);
    }

     // update data petugas
     try {
         await petugas.update({
             name:name,
             username:username,
             email:email,
             image:url
         },{
             where:{
                 id_petugas:id
             }
         })
         res.status(201).json({
             message:"petugas successfuly update"
         });
     } catch (error) {
         console.log(error.message);
         res.status(500).json({
            message:"Internal server error"
        })
     }
};



export default updatePetugas;