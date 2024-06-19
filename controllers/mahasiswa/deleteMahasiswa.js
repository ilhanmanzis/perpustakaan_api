import mahasiswa from "../../models/mahasiswaModel.js";
import deleteImage from "../../services/deleteImage.js";
const deleteMahasiswa = async(req,res)=>{
    const {id} = req.params;

    // mencari data mahasiswa
    const data = await mahasiswa.findOne({
        where:{
            id_mahasiswa:id
        }
    });

    if(!data) return res.status(404).json({
        message:"Data Not Found"
    });

    try {
        // menghapus file image mahasiswa
        await deleteImage(data.image, 'mahasiswa');

        // menghapus data mahasiswa
        await mahasiswa.destroy({
            where:{
                id_mahasiswa:id
            }
        });
        res.status(200).json({
            message:"Mahasiswa successfuly deleted"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

export default deleteMahasiswa;