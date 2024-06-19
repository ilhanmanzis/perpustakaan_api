import rak from "../../models/rakModel.js";

const deleteRak = async(req,res)=>{
    // mengecek data rak berdasarkan id
    const data = await rak.findOne({
        where:{
            id_rak:req.params.id
        }
    });
    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    // menghapus data rak
    try {
        await rak.destroy({
            where:{
                id_rak:req.params.id
            }
        });
        res.status(201).json({
            message:"Rak Successfuly deleted"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }

}

export default deleteRak;