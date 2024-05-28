import buku from "../../models/bukuModel.js";
import kategori from "../../models/kategoriModel.js";
import rak from "../../models/rakModel.js";

const getBuku = async(req,res)=>{
    try {
        const data  = await buku.findAll({
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
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
};

export default getBuku;

