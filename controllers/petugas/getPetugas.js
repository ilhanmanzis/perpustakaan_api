import petugas from "../../models/PetugasModel.js";

const getPetugas = async(req,res)=>{
    try {
        const response = await petugas.findAll({
            where:{
                role:'petugas'
            },
            attributes:['id_petugas', 'name', 'username', 'email', 'image', 'role']
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })       
    }
}

export default getPetugas;