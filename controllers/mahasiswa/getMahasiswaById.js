import mahasiswa from "../../models/mahasiswaModel.js";

const getMahasiswaById = async(req,res)=>{
    try {
        const data = await mahasiswa.findOne({
            where:{
                id_mahasiswa:req.params.id
            }
        });
        if(!data) return res.status(404).json({
            message:"Data Not Found"
        });

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
};

export default getMahasiswaById;