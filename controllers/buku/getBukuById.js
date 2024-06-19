import buku from "../../models/bukuModel.js";
import kategori from "../../models/kategoriModel.js";
import rak from "../../models/rakModel.js";

const getBukuById = async(req,res)=>{
    const {id} = req.params;

    try {
        const data = await buku.findOne({
            where:{
                id_buku:id
            },
            include:[
                {
                    model:kategori,
                    attributes:['id_kategori', 'name_kategori']
                },
                {
                    model:rak,
                    attributes:['id_rak', 'nomor_rak','name_rak']
                }
            ]
        });
        if(!data) return res.status(404).json({
            message:"Data Not Found"
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

export default getBukuById;