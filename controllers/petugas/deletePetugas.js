import petugas from "../../models/PetugasModel.js";
import deleteImage from "../../services/deleteImage.js";

const deletePetugas= async(req,res)=>{

    // mencari data petugas berdasarkan id
    const response = await petugas.findOne({
        where:{
            id_petugas: req.params.id
        }
    });
    if(!response) return res.status(404).json({
        message:"Data not found"
    });

    
    try {
        // menghapus file image di server
        await deleteImage(response.image, 'petugas');

        // menghapus data petugas
        await petugas.destroy({
            where:{
                id_petugas:req.params.id
            }
        });

        res.status(200).json({
            message:"petugas successfuly deleted"
        });
    } catch (error) {
        console.log(error.message);
    }
}


export default deletePetugas;