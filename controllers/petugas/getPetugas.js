import petugas from "../../models/PetugasModel.js";

const getPetugas = async(req,res)=>{
    try {
        const response = await petugas.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)       
    }
}

export default getPetugas;