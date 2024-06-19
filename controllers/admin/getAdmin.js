import petugas from "../../models/PetugasModel.js";

const getAdmin = async(req,res)=>{
    try {
        const response = await petugas.findOne({
            where:{
                role:'admin'
            },
            attributes:['id_petugas', 'name', 'username', 'email', 'image', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export default getAdmin;