import buku from "../../models/bukuModel.js";
import deleteImage from "../../services/deleteImage.js";

const deleteBuku = async(req,res)=>{
    const {id} = req.params;

    // mencari data buku
    const data = await buku.findOne({
        where:{
            id_buku:id
        }
    });
    
    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    // menghapus foto sampul
    await deleteImage(data.foto_sampul, 'foto_sampul');


    // menghapus foto lampiran
    await deleteImage(data.foto_lampiran, 'foto_lampiran');

    // menghapus data buku
    try {
        await buku.destroy({
            where:{
                id_buku:id
            }
        });

        res.status(201).json({
            message:"buku successfuly delete"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

export default deleteBuku;