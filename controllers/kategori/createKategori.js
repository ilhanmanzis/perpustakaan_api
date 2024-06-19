import kategori from "../../models/kategoriModel.js";
import { nanoid } from "nanoid";

const createKategori = async(req,res)=>{
    const {nameKategori} = req.body;
    
    // validasi name kategori
    if(nameKategori===null || nameKategori===undefined || nameKategori==="") return res.status(400).json({
        message:"name kategori is required"
    });

    // membuat id
    const id = nanoid(16);

    try {
        await kategori.create({
            id_kategori:id,
            name_kategori:nameKategori
        });
        res.status(201).json({
            message:"kategori successfuly created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export default createKategori;