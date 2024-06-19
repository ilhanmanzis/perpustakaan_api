import kategori from "../../models/kategoriModel.js";

const deleteKategori = async(req,res)=>{
    // mencari data kategori berdasarkan id
    const data = await kategori.findOne({
        where:{
            id_kategori:req.params.id
        }
    });
    
    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    // menghapus data kategori

    try {
        await kategori.destroy({
            where:{
                id_kategori:req.params.id
            }
        });
        res.status(201).json({
            message:"kategori successfuly deleted"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export default deleteKategori;