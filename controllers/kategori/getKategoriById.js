import kategori from "../../models/kategoriModel.js";

const getKategoriById = async(req,res)=>{
    try {
        const data = await kategori.findOne({
            where:{
                id_kategori:req.params.id
            }
        });

        if(!data) return res.status(404).json({
            message:"Data Not Found"
        });

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
}

export default getKategoriById