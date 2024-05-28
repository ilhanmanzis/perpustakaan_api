import rak from "../../models/rakModel.js";
import { nanoid } from "nanoid";

const createRak = async(req,res)=>{
    const {nomorRak, nameRak}=req.body;

    // validasi nomor rak
    if(nomorRak===null || nomorRak===undefined || nomorRak==="") return res.status(400).json({
        message:"nomor rak is required"
    });

    if(isNaN(nomorRak)) return res.status(400).json({
        message:"nomor rak is Integer"
    })

    // validasi name rak
    if(nameRak===null || nameRak===undefined || nameRak==="") return res.status(400).json({
        message:"name rak is required"
    });


    // mengecek nomor rak
    const data = await rak.findOne({
        where:{
            nomor_rak:nomorRak
        }
    });

    if(data) return res.status(400).json({
        message:"nomor rak already exists"
    });

    // membuat id
    const id = nanoid(16)

    try {
        await rak.create({
            id_rak:id,
            nomor_rak:nomorRak,
            name_rak:nameRak
        });
        res.status(201).json({
            message:"Rak successfuly created"
        });
    } catch (error) {
        console.log(error.message);
    }


}

export default createRak;