import mahasiswa from "../../models/mahasiswaModel.js";

const getMahasiswa = async(req,res)=>{
    try {
        const data = await mahasiswa.findAll();
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
}

export default getMahasiswa;