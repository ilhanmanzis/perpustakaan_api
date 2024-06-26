import mahasiswa from "../../models/mahasiswaModel.js";

const getMahasiswa = async(req,res)=>{
    try {
        const data = await mahasiswa.findAll();
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export default getMahasiswa;