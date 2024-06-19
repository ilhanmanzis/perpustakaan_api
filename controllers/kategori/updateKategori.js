import kategori from "../../models/kategoriModel.js";

const updateKategori = async(req,res)=>{
    const {id} = req.params

    // mengecek data kategori berdasarkan id
    const data = await kategori.findOne({
        where:{
            id_kategori:id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    const {nameKategori} = req.body;

    // validasi name kategori
    if(nameKategori===null || nameKategori===undefined || nameKategori==="") return res.status(400).json({
        message:"name kategori is required"
    });

    try {
        await kategori.update({
            name_kategori:nameKategori
        },{
            where:{
                id_kategori:id
            }
        });
        res.status(201).json({
            message:"kategori successfuly updated"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }

}

export default updateKategori;