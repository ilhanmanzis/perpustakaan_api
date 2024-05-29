import petugas from "../../models/PetugasModel.js";

const getPetugas = async(req,res)=>{
    try {
        const response = await petugas.findAll({
            attributes:['id_petugas', 'name', 'username', 'email', 'image']
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)       
    }
}

export default getPetugas;