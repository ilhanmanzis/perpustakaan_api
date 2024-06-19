import petugas from "../../models/PetugasModel.js";

const getPetugasById = async(req,res)=>{
    try {
        const response = await petugas.findOne({
            where:{
                id_petugas:req.params.id,
            },
            attributes:['id_petugas', 'name', 'username', 'email', 'image', 'role']
        });
        if(!response) return res.status(404).json({
            message:"Data Not Found"
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}


export default getPetugasById