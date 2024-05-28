import rak from "../../models/rakModel.js";

const getRakById = async(req,res)=>{
    try {
        const data = await rak.findOne({
            where:{
                id_rak:req.params.id
            }
        });
        if(!data) return res.status(404).json({
            message:"Data Not Found"
        });
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
    }
}

export default getRakById;